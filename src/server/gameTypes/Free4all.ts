import collisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';
import { rand } from '../../shared/helpers';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Weapon from '../models/weapons/Weapon';
import Emitter from '../services/Emitter';
import AidKit from '../models/AidKit';
import SlowBullets from '../models/powers/SlowBullets';
import Power from '../../shared/models/Power';
import Teleport from '../models/powers/Teleport';
import BulletModel from '../../shared/models/BulletModel';

export default class Free4all implements GameModel {
  public type: string = 'Free for all';
  private interval;
  private customInterval;

  constructor(
    public emitter: Emitter,
    public roomName: string,
    public map: GameMap,
    public players: Player[] = [],
    public bullets: Bullet[] = [],
  ) {
    this.interval = setInterval(() => {
      this.updatePlayersPosition();
      this.updateBullets();
      this.detectBulletsCollision();
      this.emitter.emitGameState(this);
    }, 1000 / 60);
    this.customInterval = setInterval(() => {
      this.regeneratePlayers();
    }, 1000);
  }

  getPlayer(id: string) {
    return this.players.find(player => player.id === id);
  }

  alivePlayers() {
    return this.players.filter(player => player.alive === true);
  }

  getPlayers() {
    return this.players;
  }

  isPlayerInThisGame(id: string) {
    return this.players.find(player => player.id === id);
  }

  getBullets() {
    return this.bullets.map(bullet => ({
      id: bullet.id,
      x: bullet.x,
      y: bullet.y,
      size: bullet.size,
    }));
  }

  getMapName() {
    return this.map.getMapName();
  }

  getStaticObjects() {
    return this.map.getStaticObjects();
  }

  getItemGenerators() {
    return this.map.getItemGenerators();
  }

  getItemGeneratorsAPI() {
    return this.getItemGenerators().map(itemGenerator => new ItemGeneratorAPI(itemGenerator));
  }

  deleteBulletIfInactive(bullet: Bullet, i) {
    if (!bullet.isActive()) {
      this.bullets.splice(i, 1);
    }
  }

  updateBullets() {
    this.bullets.forEach((bullet, i) => {
      bullet.updatePosition();
      this.deleteBulletIfInactive(bullet, i);
    });
  }

  detectBulletsCollision() {
    this.bullets.forEach((bullet, i) => {
      [...this.getStaticObjects(), ...this.alivePlayers()].forEach((object: Player) => {
        if (bullet.owner !== object) {
          const bulletDirection = {
            x: bullet.directionX,
            y: bullet.directionY,
          };
          const { yes, angle } = collisionDetector.detectCollision(bullet, object, bulletDirection);
          if (yes) {
            object.hitFromBullet(bullet, angle);
            this.deleteBulletIfInactive(bullet, i);
          } else if (object.selectedPower instanceof SlowBullets) {
            object.selectedPower.effect({ bullet, bulletDirection, owner: object }) &&
              this.emitPowerInfo(object);
          }
        }
      });
    });
  }

  shoot(mouseClick: MouseCoordinates) {
    const owner = this.getPlayer(mouseClick.owner);
    if (owner) {
      const bullets = owner.shoot(mouseClick);
      if (bullets && bullets.length > 0) {
        return {
          owner,
          bullets,
        };
      }
    }
  }

  generateBullets(bullets: Bullet[]) {
    this.bullets.push(...bullets);
    this.emitter.sendNewBullets(this.roomName, bullets.map(this.toBulletModel));
  }

  toBulletModel(bullet: Bullet): BulletModel {
    return {
      shape: bullet.shape,
      x: bullet.x,
      y: bullet.y,
      id: bullet.id,
      size: bullet.size,
      color: bullet.color,
      targetX: bullet.targetX,
      targetY: bullet.targetY,
      flash: bullet.flash,
    };
  }
  revivePlayer(id: string) {
    const player = this.getPlayer(id);
    player && !this.detectPlayerCollision(player) && player.revive();
  }

  regeneratePlayers(value?: number) {
    this.alivePlayers().forEach(player => {
      player.regenerate(value);
      this.emitPowerInfo(player);
    });
  }

  connectPlayer(id: string, newPlayer: NewUser): Player {
    const player = new Player(
      id,
      newPlayer.name,
      newPlayer.color,
      rand(1000),
      rand(1000),
      this.roomName,
    );
    //
    player.addAndSelectPower(new Teleport());
    player.addPower(new SlowBullets());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    this.players.push(player);
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    this.players.splice(this.players.indexOf(disconnected), 1);
    this.emitter.disconnectPlayer(this.roomName, disconnected);
  }

  updateKeys(id: string, keys: Array<string>) {
    const player = this.getPlayer(id);
    player && (player.keys = new Set(keys));
  }

  updatePlayersPosition() {
    this.players.forEach(player => this.updatePlayerPosition(player));
  }

  updatePlayerPosition(player: Player) {
    if (player) {
      const shift = player.keys.has('Shift');
      if (player.keys.has('W') || player.keys.has('ArrowUp')) {
        if (
          !player.isAlive() ||
          !this.detectPlayerCollision(player, {
            x: 0,
            y: player.speed,
          })
        ) {
          player.goDown();
        }
      }
      if (player.keys.has('S') || player.keys.has('ArrowDown')) {
        if (
          !player.isAlive() ||
          !this.detectPlayerCollision(player, {
            x: 0,
            y: -player.speed,
          })
        ) {
          player.goUp();
        }
      }
      if (player.keys.has('A') || player.keys.has('ArrowLeft')) {
        if (
          !player.isAlive() ||
          !this.detectPlayerCollision(player, {
            x: -player.speed,
            y: 0,
          })
        ) {
          player.goLeft();
        }
      }
      if (player.keys.has('D') || player.keys.has('ArrowRight')) {
        if (
          !player.isAlive() ||
          !this.detectPlayerCollision(player, {
            x: player.speed,
            y: 0,
          })
        ) {
          player.goRight();
        }
      }
      if (player.keys.has('1') && !shift) {
        player.selectWeapon(0);
        this.emitWeaponInfo(player);
      }
      if (player.keys.has('2') && !shift) {
        player.selectWeapon(1);
        this.emitWeaponInfo(player);
      }
      if (player.keys.has('3') && !shift) {
        player.selectWeapon(2);
        this.emitWeaponInfo(player);
      }
      if (player.keys.has('4') && !shift) {
        player.selectWeapon(3);
        this.emitWeaponInfo(player);
      }
      if (shift && player.keys.has('!')) {
        player.selectPower(0);
      }
      if (shift && player.keys.has('@')) {
        player.selectPower(1);
      }
      if (shift && player.keys.has('#')) {
        player.selectPower(2);
      }
      if (shift && player.keys.has('$')) {
        player.selectPower(3);
      }
      if (shift) {
        player.usePower(this);
        this.emitPowerInfo(player);
      } else {
        player.releasePower();
      }
      if (player.keys.has('Escape')) {
        this.disconnectPlayer(player);
      }
    }
  }

  updatePlayerDirection(mouseCoordinates: MouseCoordinates) {
    const owner = this.getPlayer(mouseCoordinates.owner);
    if (owner) {
      const dx = mouseCoordinates.targetX - owner.x;
      const dy = mouseCoordinates.targetY - owner.y;
      owner.direction = Math.atan2(dy, dx) - 80;
    }
  }

  mouseClick(mouseClick: MouseCoordinates) {
    const player = this.getPlayer(mouseClick.owner);
    if (player.isAlive()) {
      if (player.keys.has('Shift')) {
        player.usePower(this, mouseClick);
        this.emitPowerInfo(player);
      } else {
        const shoot = this.shoot(mouseClick);
        if (shoot) {
          this.generateBullets(shoot.bullets);
          this.emitWeaponInfo(shoot.owner);
        }
      }
    } else {
      this.revivePlayer(mouseClick.owner);
    }
  }

  emitWeaponInfo(player) {
    this.emitter.updateWeaponInfo(player.id, {
      selectedWeapon: player.selectedWeapon,
      weapons: player.weapons.map((weapon: Weapon) => ({ type: weapon.type, id: weapon.id })),
    });
  }

  emitPowerInfo(player) {
    this.emitter.updatePowerInfo(player.id, {
      selectedPower: player.selectedPower,
      powers: player.powers.map((power: Power) => ({ type: power.type, id: power.id })),
      energy: player.energy,
    });
  }

  addWeapon(player, newWeapon) {
    const weapon = player.weapons.find(weapon => weapon.type === newWeapon.type);
    if (weapon) {
      const sumBullets = weapon.bulletsInMagazine + newWeapon.bulletsInMagazine;
      weapon.magazines +=
        newWeapon.magazines + Math.floor(sumBullets / weapon.maxBulletsInMagazine);
      weapon.bulletsInMagazine = sumBullets % weapon.maxBulletsInMagazine;
      if (weapon.bulletsInMagazine === 0) {
        weapon.reload();
      }
    } else {
      player.addAndSelectWeapon(newWeapon);
    }
  }

  detectPlayerCollisionWithGenerator(player: Player, direction?: Direction) {
    this.getItemGenerators().forEach(generator => {
      if (
        collisionDetector.detectCollision(player, generator, direction).yes &&
        generator.isReady()
      ) {
        generator.deactivate();
        setTimeout(() => {
          generator.activate();
          this.emitter.updateItemGenerator(this.roomName, new ItemGeneratorAPI(generator));
        }, generator.time);
        const item = generator.generateItem();
        if (item instanceof Weapon) {
          this.addWeapon(player, item);
          this.emitWeaponInfo(player);
        } else if (item instanceof AidKit) {
          player.takeAidKit(item);
          this.emitPowerInfo(player);
        }
        this.emitter.updateItemGenerator(this.roomName, new ItemGeneratorAPI(generator));
      }
    });
  }

  detectPlayerCollisionWithObjects(player: Player, direction?: Direction) {
    return [
      ...this.getStaticObjects(),
      ...this.alivePlayers().filter(object => player !== object),
    ].some(object => collisionDetector.detectCollision(player, object, direction).yes);
  }

  detectPlayerCollision(player: Player, direction?: Direction) {
    this.detectPlayerCollisionWithGenerator(player, direction);
    return this.detectPlayerCollisionWithObjects(player, direction);
  }
}
