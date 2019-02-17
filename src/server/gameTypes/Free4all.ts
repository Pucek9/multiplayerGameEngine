import CollisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';

export default class Free4all implements GameModel {
  public type: string = 'Free for all';

  constructor(
    public main,
    public name: string,
    public map: GameMap,
    public players: Player[] = [],
    public bullets: Bullet[] = [],
  ) {}

  static rand(x: number) {
    return Math.floor(Math.random() * x + 1);
  }

  generateId() {
    return Date.now() + Math.floor(Math.random() * 100);
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
    return this.bullets.map(bullet => {
      return { id: bullet.id, x: bullet.x, y: bullet.y };
    });
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
      if (!bullet.isStillInAir()) {
        this.bullets.splice(i, 1);
      }
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

  addBullet(mouseClick: MouseCoordinates) {
    const owner = this.getPlayer(mouseClick.owner);
    if (owner) {
      const bullet = new Bullet(
        this.generateId(),
        owner,
        owner.x + owner.size / 4,
        owner.y + owner.size / 4,
        mouseClick.targetX,
        mouseClick.targetY,
        2,
      );
      this.bullets.push(bullet);
      return { id: bullet.id, size: bullet.size };
    }
  }

  revivePlayer(id: string) {
    const player = this.getPlayer(id);
    if (player && !this.detectPlayerCollision(player)) {
      player.revive();
    }
  }

  connectPlayer(id: string, newPlayer: NewPlayer): Player {
    const player = new Player(
      id,
      newPlayer.name,
      newPlayer.color,
      Free4all.rand(1000),
      Free4all.rand(1000),
      20,
    );
    this.players.push(player);
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    this.players.splice(this.players.indexOf(disconnected), 1);
  }

  setKeys(id: string, keys: Array<string>) {
    const player = this.getPlayer(id);
    if (player) {
      player.keys = new Set(keys);
    }
  }

  updatePlayerPosition(id: string) {
    const player = this.getPlayer(id);
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
      if (player.keys.has('Shift')) {
        player.getAura();
      } else {
        player.removeAura();
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

  isPlayerAlive(id: string) {
    return this.getPlayer(id).isAlive();
  }

  onMouseClick(mouseClick: MouseCoordinates) {
    if (this.isPlayerAlive(mouseClick.owner)) {
      const bullet = this.addBullet(mouseClick);
      this.main.sendNewBullet(bullet);
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
