import CollisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';
import { rand } from '../../shared/helpers';
import Pistol from '../models/weapons/Pistol';
import Shotgun from '../models/weapons/Shotgun';

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
    return this.bullets.map(bullet => ({ id: bullet.id, x: bullet.x, y: bullet.y }));
  }

  getMapName() {
    return this.map.getMapName();
  }

  getStaticObjects() {
    return this.map.getStaticObjects();
  }

  updateBullets() {
    this.bullets.forEach((bullet, i) => {
      bullet.update();
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
      if (bullets) {
        this.bullets.push(...bullets);
        return bullets.map(bullet => ({ id: bullet.id, size: bullet.size }));
      }
    }
  }

  revivePlayer(id: string) {
    const player = this.getPlayer(id);
    player && !this.detectPlayerCollision(player) && player.revive();

  }

  connectPlayer(id: string, newPlayer: NewPlayer): Player {
    const player = new Player(id, newPlayer.name, newPlayer.color, rand(1000), rand(1000), 20);
    player.addWeapon(new Pistol());
    player.addWeapon(new Shotgun());
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
      }
      if (player.keys.has('2')) {
        player.selectWeapon(1);
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
      const bullets = this.shoot(mouseClick);
      bullets && this.main.sendNewBullets(bullets);
    } else {
      this.revivePlayer(mouseClick.owner);
    }
  }

  private detectPlayerCollision(player: Player, direction?: Direction) {
    return [...this.getStaticObjects(), ...this.alivePlayers()].some(object => {
      return player !== object && CollisionDetector.detectCollision(player, object, direction);
    });
  }
}
