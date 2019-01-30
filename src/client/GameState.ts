import Player from './models/Player';
import Camera from './models/Camera';
import PlayerModel from '../shared/models/PlayerModel';
import Bullet from './models/Bullet';
import BulletUpdate from '../shared/apiModels/BulletUpdate';
import StaticRectangleObject from './models/StaticRectangleObject';
import StaticCircularObject from './models/StaticCircularObject';
import Light from './models/Light';
import PlayerListComponent from './UserInterface/PlayersList';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import Map from './models/Map';
import Cursor from './models/Cursor';

const mapJPG = require('./games/balls/images/test.jpg');
const cursorPNG = require('./games/balls/images/pointer.png');

export default class GameState {
  user;
  screen;
  currentPlayer;
  camera: Camera;
  light: Light;
  playersListComponent;
  players = [];
  playersListString = '';
  bullets;
  keys: Set<string> = new Set([]);
  staticObjects: any[];
  map: Map;
  cursor: Cursor;

  constructor(user, screen) {
    this.user = user;
    this.screen = screen;
    this.light = new Light(screen);
    this.playersListComponent = new PlayerListComponent();
    this.map = new Map(mapJPG);
    this.cursor = new Cursor(cursorPNG);
    this.bullets = [];

    this.map.init(this.screen);
    this.cursor.init(this.screen);
  }

  appendNewPlayer(newPlayer) {
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.color,
      newPlayer.x,
      newPlayer.y,
    );
    player.init(this.screen);
    player.setAsEnemy();
    this.players.push(player);
    if (!this.currentPlayer) {
      this.currentPlayer = this.players.find(_player => _player.id === this.user.id);
      this.currentPlayer.setAsActive();

      this.camera = new Camera(this.currentPlayer);
      this.camera.init(this.screen);
      this.light.init(this.currentPlayer, this.cursor);
    }
  }

  appendPlayers(_players: PlayerModel[]) {
    _players
      .filter(_player => _player.active)
      .forEach(_player => {
        const existed = this.players.find(player => player.id === _player.id);
        if (!existed) {
          const player = new Player(_player.id, _player.name, _player.color, _player.x, _player.y);
          player.init(this.screen);
          player.setAsEnemy();
          this.players.push(player);
        }
      });
  }

  addKey(e: KeyboardEvent) {
    this.keys.add(normalizeKey(e.key));
  }

  getKeys() {
    return [...this.keys];
  }

  deleteKey(e: KeyboardEvent) {
    this.keys.delete(normalizeKey(e.key));
  }

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      // screen.camera.rotation.x += 0.1;
      this.screen.camera.position.z += 10;
    } else {
      // screen.camera.rotation.x -= 0.1;
      this.screen.camera.position.z -= 10;
    }
  }

  appendNewBullet(newBullet: Bullet) {
    if (newBullet) {
      const bullet = new Bullet(newBullet.id, newBullet.size);
      bullet.init(this.screen);
      this.bullets.push(bullet);
    }
  }

  updatePlayersState(_players: PlayerModel[]) {
    this.players.forEach(player => {
      const foundPlayer = _players.find(_player => player.id === _player.id);
      if (this.currentPlayer && foundPlayer.id === this.currentPlayer.id) {
        const diff = {
          x: player.x - foundPlayer.x,
          y: player.y - foundPlayer.y,
        };
        this.cursor.x -= diff.x;
        this.cursor.y -= diff.y;
      }
      if (foundPlayer) {
        player.x = foundPlayer.x;
        player.y = foundPlayer.y;
        player.active = foundPlayer.active;
        player.hp = foundPlayer.hp;
        player.score = foundPlayer.score;
        player.direction = foundPlayer.direction;
      }
    });
  }

  updateBulletsState(_bullets: BulletUpdate[]) {
    this.bullets.forEach(bullet => {
      const foundBullet = _bullets.find(_bullet => bullet.id === _bullet.id);
      if (foundBullet) {
        bullet.x = foundBullet.x;
        bullet.y = foundBullet.y;
      } else {
        bullet.remove(this.screen);
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }

  appendStaticObjects(_staticObjects: any[]) {
    this.staticObjects = _staticObjects;
    this.staticObjects.forEach(_staticObject => {
      if (_staticObject.type === 'rectangle') {
        Object.setPrototypeOf(_staticObject, StaticRectangleObject.prototype);
      } else {
        Object.setPrototypeOf(_staticObject, StaticCircularObject.prototype);
      }
    });
    this.staticObjects.forEach(object => object.init(this.screen));
  }

  removePlayer(id: string) {
    const disconnected = this.players.find(player => player.id === id);
    if (disconnected) {
      disconnected.remove(this.screen);
      this.players.splice(this.players.indexOf(disconnected), 1);
    }
  }

  getUpdatedMouseCoordinates(e: MouseEvent) {
    if (this.currentPlayer) {
      this.cursor.x = e.clientX + this.currentPlayer.x - window.innerWidth / 2;
      this.cursor.y = -e.clientY + this.currentPlayer.y + window.innerHeight / 2;
      return new MouseCoordinates(this.cursor.x, this.cursor.y, this.user.id);
    }
  }

  getMouseCoordinates() {
    return new MouseCoordinates(this.cursor.x, this.cursor.y, this.user.id);
  }

  tryRenderEverything() {
    this.screen.renderer.render(this.screen.scene, this.screen.camera);

    this.renderPlayerList();
    if (this.currentPlayer) {
      [
        this.camera,
        this.map,
        ...this.staticObjects,
        ...this.bullets,
        ...this.players.filter(player => player.active),
        this.cursor,
        this.light,
      ].forEach(object => object.render());
    }
  }

  renderPlayerList() {
    const playersList = this.players.map(({ name, score, color, hp }) => ({
      name,
      score,
      color,
      hp,
    }));
    const _playersListString = JSON.stringify(playersList);
    if (_playersListString !== this.playersListString) {
      this.playersListComponent.render(playersList);
      this.playersListString = _playersListString;
    }
  }
}

function normalizeKey(key) {
  return key.length !== 1 ? key : key.toUpperCase();
}
