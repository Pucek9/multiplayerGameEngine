import CollisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';
import { rand } from '../../shared/helpers';
import Pistol from '../models/weapons/Pistol';
import Shotgun from '../models/weapons/Shotgun';
import NewBullet from '../../shared/apiModels/NewBullet';
import Resizer from '../models/weapons/Resizer';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Item from '../../shared/models/Item';
import Weapon from '../models/weapons/Weapon';

export default class Free4all implements GameModel {
  public type: string = 'Free for all';
  private interval;

  constructor(
    public main,
    public name: string,
    public map: GameMap,
    public players: Player[] = [],
    public bullets: Bullet[] = [],
  ) {
    this.interval = setInterval(() => {
      this.updatePlayersPosition();
      this.updateBullets();
      this.detectBulletsCollision();
      this.main.emitGameState(this);
    }, 1000 / 60);
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

  updateBullets() {
    this.bullets.forEach((bullet, i) => {
      bullet.updatePosition();
      !bullet.isStillInAir() && this.bullets.splice(i, 1);
    });
  }

  detectBulletsCollision() {
    this.bullets.forEach((bullet, i) => {
      [...this.getStaticObjects(), ...this.alivePlayers()].forEach((object: Player) => {
        if (bullet.owner !== object) {
          if (CollisionDetector.detectCollision(object, bullet)) {
            object.hitFromBullet(bullet);
            this.bullets.splice(i, 1);
          }
          if (object.aura) {
            if (CollisionDetector.detectCollision(object.aura, bullet)) {
              bullet.decreaseSpeed();
            } else {
              bullet.increaseSpeed();
            }
          }
        }
      });
    });
  }

  shoot(mouseClick: MouseCoordinates) {
    const owner = this.getPlayer(mouseClick.owner);
    if (owner) {
      const bullets = owner.shoot(mouseClick);
      if (bullets.length > 0) {
        this.bullets.push(...bullets);
        return {
          owner,
          bullets: bullets.map(bullet => ({
            id: bullet.id,
            size: bullet.size,
            color: bullet.color,
          })),
        };
      }
    }
  }

  revivePlayer(id: string) {
    const player = this.getPlayer(id);
    player && !this.detectPlayerCollision(player) && player.revive();
  }

  connectPlayer(id: string, newPlayer: NewUser): Player {
    const player = new Player(id, newPlayer.name, newPlayer.color, rand(1000), rand(1000));
    // player.addWeapon(new Pistol());
    // player.addWeapon(new Shotgun());
    // player.addWeapon(new Resizer());
    // player.selectWeapon(0);
    this.getWeaponInfo(player);
    this.players.push(player);
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    this.players.splice(this.players.indexOf(disconnected), 1);
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
      if (player.keys.has('1')) {
        player.selectWeapon(0);
        this.getWeaponInfo(player);
      }
      if (player.keys.has('2')) {
        player.selectWeapon(1);
        this.getWeaponInfo(player);
      }
      if (player.keys.has('3')) {
        player.selectWeapon(2);
        this.getWeaponInfo(player);
      }
      if (player.keys.has('Shift')) {
        player.getAura();
      } else {
        player.removeAura();
      }
      // if (player.keys.has('Escape')) {
      //   this.disconnectPlayer(player);
      //   this.main.disconnectPlayer(player.name);
      // }
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

  isPlayerAlive(id: string) {
    const player = this.getPlayer(id);
    if (player) {
      return this.getPlayer(id).isAlive();
    }
  }

  mouseClick(mouseClick: MouseCoordinates) {
    if (this.isPlayerAlive(mouseClick.owner)) {
      const shoot = this.shoot(mouseClick);
      if (shoot) {
        this.main.sendNewBullets(shoot.bullets);
        this.getWeaponInfo(shoot.owner);
      }
    } else {
      this.revivePlayer(mouseClick.owner);
    }
  }

  getWeaponInfo(player) {
    this.main.updateWeaponInfo(player.id, {
      selectedWeapon: player.selectedWeapon,
      weapons: player.weapons.map((weapon: Weapon) => ({ type: weapon.type, id: weapon.id })),
    });
  }

  private detectPlayerCollisionWithGenerator(player: Player, direction?: Direction) {
    this.getItemGenerators().forEach(generator => {
      if (CollisionDetector.detectCollision(player, generator, direction) && generator.isReady()) {
        generator.deactivate();
        setTimeout(() => {
          generator.activate();
          this.main.updateItemGenerator(new ItemGeneratorAPI(generator));
        }, generator.time);
        const weapon = generator.generateItem();
        player.addWeapon(weapon);
        this.getWeaponInfo(player);
        this.main.updateItemGenerator(new ItemGeneratorAPI(generator));
      }
    });
  }

  private detectPlayerCollision(player: Player, direction?: Direction) {
    this.detectPlayerCollisionWithGenerator(player, direction);
    return [
      ...this.getStaticObjects(),
      ...this.alivePlayers().filter(object => player !== object),
    ].some(object => {
      return CollisionDetector.detectCollision(player, object, direction);
    });
  }
}
