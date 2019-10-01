import collisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameModel from './GameModel';
import { Direction } from '../../shared/models/Direction';
import { rand } from '../../shared/helpers';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Weapon from '../models/weapons/Weapon';
import Emitter from '../services/Emitter';
import AidKit from '../models/AidKit';
import SlowBullets from '../models/powers/SlowBullets';
import Power from '../../shared/models/Power';
import Teleport from '../models/powers/Teleport';
import BulletModel from '../../shared/models/BulletModel';
import ReverseBullets from '../models/powers/ReverseBullets';
import Accelerator from '../models/powers/Accelerator';
import Pistol from '../models/weapons/Pistol';
import Knife from '../models/weapons/Knife';
import SteeringService from '../services/Steering';
import Aura from '../models/powers/Aura';
import ClickPower from '../models/powers/ClickPower';
import StaticRectangleObject from '../models/StaticRectangleObject';
import StaticCircularObject from '../models/StaticCircularObject';

export default class Free4all implements GameModel {
  public type: string = 'Free for all';
  private interval;
  private customInterval;

  constructor(
    public steering: SteeringService,
    public emitter: Emitter,
    public roomName: string,
    public map: GameMap,
    public players: Player[] = [],
    public bullets: Bullet[] = [],
  ) {
    // const bot = this.createBot();
    this.interval = setInterval(() => {
      this.performKeysOperationForPlayers();
      this.updateBullets();
      this.detectBulletsCollision();
      this.emitter.emitGameState(this);
    }, 1000 / 60);
    this.customInterval = setInterval(() => {
      // this.mouseClick({ targetX: bot.x, targetY: bot.y - 100, owner: bot.id });
      this.regeneratePlayers();
      this.updateTimeForDeadPlayers();
    }, 1000);
  }

  createBot() {
    const bot = this.connectPlayer(
      'bot',
      {
        id: 'bot',
        gameName: this.roomName,
        color: 'red',
        name: 'bot',
      },
      200,
      -300,
    );
    bot.direction = -1.5;
    bot.hp = bot.baseHp = 1000;
    bot.energy = bot.baseEnergy = 1000;
    bot.revive();
    bot.keys.add('Shift');
    bot.addAndSelectWeapon(new Pistol({ magazines: 5000 }));
    return bot;
  }

  getPlayer(id: string) {
    return this.players.find(player => player.id === id);
  }

  getAlivePlayers() {
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

  getStaticObjects(): (StaticRectangleObject | StaticCircularObject)[] {
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
      [...this.getStaticObjects(), ...this.getAlivePlayers()].forEach(
        (object: StaticCircularObject | StaticRectangleObject | Player) => {
          if (bullet.owner !== object) {
            const bulletDirection = {
              x: bullet.directionX,
              y: bullet.directionY,
            };
            const { yes, angle } = collisionDetector.detectCollision(
              bullet,
              object,
              bulletDirection,
            );
            if (yes) {
              object.hitFromBullet(bullet, angle);
              this.deleteBulletIfInactive(bullet, i);
            } else if (object instanceof Player && object.selectedPower instanceof Aura) {
              object.selectedPower.effect({ bullet, bulletDirection, owner: object }) &&
                this.emitPowerInfo(object);
            }
          }
        },
      );
    });
  }

  shoot(mouseClick: MouseCoordinates) {
    const owner = this.getPlayer(mouseClick.owner);
    if (owner) {
      owner.shoot(mouseClick, this);
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
    this.getAlivePlayers().forEach(player => {
      player.regenerate(value);
      this.emitPowerInfo(player);
    });
  }

  connectPlayer(id: string, newPlayer: NewUser, x = rand(1000), y = rand(1000)): Player {
    const player = new Player(id, newPlayer.name, newPlayer.color, x, y, this.roomName);
    //
    player.addAndSelectPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addAndSelectWeapon(new Knife());
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

  performKeysOperationForPlayers() {
    this.players.forEach(player => this.performKeysOperation(player));
  }

  performKeysOperation(player: Player) {
    if (player) {
      this.steering.performKeysOperation(this, player);
    }
  }

  updatePlayerDirection(mouseCoordinates: MouseCoordinates) {
    const owner = this.getPlayer(mouseCoordinates.owner);
    if (owner) {
      owner.updateDirection(mouseCoordinates);
    }
  }

  mouseClick(mouseClick: MouseCoordinates) {
    const player = this.getPlayer(mouseClick.owner);
    if (player.isAlive()) {
      player.setMouseDown();
      if (player.selectedPower instanceof ClickPower && player.keys.has('Shift')) {
        player.usePower(this, mouseClick);
        this.emitPowerInfo(player);
      } else {
        this.shoot(mouseClick);
      }
    } else {
      this.revivePlayer(mouseClick.owner);
    }
  }

  mouseUp(mouseCoordinates: MouseCoordinates) {
    const player = this.getPlayer(mouseCoordinates.owner);
    if (player.isAlive()) {
      player.setMouseUp();
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
      ...this.getAlivePlayers().filter(object => player !== object),
    ].some(object => collisionDetector.detectCollision(player, object, direction).yes);
  }

  detectPlayerCollision(player: Player, direction?: Direction) {
    this.detectPlayerCollisionWithGenerator(player, direction);
    return this.detectPlayerCollisionWithObjects(player, direction);
  }

  updateTimeForDeadPlayers() {
    this.players
      .filter(player => !player.isAlive() && player.timeToRevive !== 0)
      .forEach(player => {
        player.decreaseTimeToRevive();
        this.emitter.updateTimeToRevive(player);
      });
  }
}
