import Player from './models/Player';
import StaticCamera from './models/StaticCamera';
import Bullet from './models/Bullet';
import StaticRectangleObject from './models/StaticRectangleObject';
import StaticCircularObject from './models/StaticCircularObject';

import { Lighting } from './models/Light/Light';
import AmbientLight from './models/Light/AmbientLight';
import FlashLight from './models/Light/FlashLight';
import CursorLight from './models/Light/CursorLight';

import PlayerListComponent from './UserInterface/PlayersList';
import WeaponsListComponent from './UserInterface/WeaponsList';
import PowersListComponent from './UserInterface/PowersList';
import Map from './models/Map';
import Cursor from './models/Cursor';
import ScreenModel from './types/ScreenModel';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewUser from '../shared/apiModels/NewUser';
import NewPlayer from '../shared/apiModels/NewPlayer';
import PlayerModel from '../shared/models/PlayerModel';
import { normalizeKey } from '../shared/helpers';
import Item from './models/Item';
import ItemGeneratorAPI from '../shared/apiModels/ItemGenerator';
import ICamera from './interfaces/ICamera';
import BulletModel from '../shared/models/BulletModel';
import Text from './models/Text';

const mapJPG = require('./games/balls/images/test.jpg');
const cursorPNG = require('./games/balls/images/pointer.jpg');

export default class GameState {
  user: NewUser;
  screen: ScreenModel;
  currentPlayer: Player;
  camera: ICamera;
  light: Lighting;
  playersListComponent: PlayerListComponent;
  weaponsListComponent: WeaponsListComponent;
  powersListComponent: PowersListComponent;
  players: Player[] = [];
  playersListString: string = '';
  bullets: Bullet[] = [];
  keys: Set<string> = new Set([]);
  staticObjects: any[] = [];
  itemGenerators: Item[] = [];
  map: Map;
  cursor: Cursor;
  text: Text;

  constructor(user: NewUser, screen: ScreenModel) {
    this.user = user;
    this.screen = screen;
    this.light = new FlashLight(screen);
    // this.light = new AmbientLight(screen);
    // this.light = new CursorLight(screen);
    this.playersListComponent = new PlayerListComponent();
    this.weaponsListComponent = new WeaponsListComponent();
    this.powersListComponent = new PowersListComponent();
    this.text = new Text();
    this.map = new Map(mapJPG);
    this.cursor = new Cursor(cursorPNG);
    this.map.init(this.screen);
    this.text.init(this.screen);
    this.cursor.init(this.screen);
    this.playersListComponent.show();
    this.weaponsListComponent.show();
    this.powersListComponent.show();
  }

  appendNewPlayer(newPlayer: NewPlayer) {
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.color,
      newPlayer.x,
      newPlayer.y,
      newPlayer.roomName,
    );
    player.init(this.screen);
    player.setAsEnemy();
    this.players.push(player);
    if (!this.currentPlayer) {
      this.currentPlayer = this.players.find(_player => _player.id === this.user.id);
      this.currentPlayer.setAsCurrent();

      this.camera = new StaticCamera(this.currentPlayer);
      // this.camera = new DynamicCamera(this.currentPlayer, this.cursor);
      this.light.init({ source: this.currentPlayer, cursor: this.cursor, color: 0xff0000 });
      this.currentPlayer.setLight(this.light);
    }
  }

  handleResize = () => {
    if (this.camera && this.screen) {
      this.camera.object.aspect = window.innerWidth / window.innerHeight;
      this.camera.object.updateProjectionMatrix();
      this.screen.renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    }
  };

  appendPlayers(newPlayers: NewPlayer[]) {
    newPlayers.forEach(newPlayer => {
      const existed = this.players.find(player => player.id === newPlayer.id);
      if (!existed) {
        const player = new Player(
          newPlayer.id,
          newPlayer.name,
          newPlayer.color,
          newPlayer.x,
          newPlayer.y,
          newPlayer.roomName,
        );
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
    this.camera.wheel(e);
  }

  appendNewBullets(newBullets: BulletModel[]) {
    newBullets.forEach(newBullet => {
      const bullet = new Bullet(newBullet);
      bullet.init(this.screen);
      this.bullets.push(bullet);
    });
  }

  updatePlayersState(_players: PlayerModel[]) {
    this.players.forEach(player => {
      const foundPlayer = _players.find(_player => player.id === _player.id);
      if (this.currentPlayer && foundPlayer && foundPlayer.id === this.currentPlayer.id) {
        const diff = {
          x: player.x - foundPlayer.x,
          y: player.y - foundPlayer.y,
        };
        this.cursor.x -= diff.x;
        this.cursor.y -= diff.y;
        this.text.x = this.cursor.x + this.text.offsetX;
        this.text.y = this.cursor.y + this.text.offsetY;
      }
      if (foundPlayer) {
        const size = player.size;
        Object.assign(player, foundPlayer);
        if (player.size !== size) {
          player.updateObjectGeometry();
        }
      }
    });
  }

  updateBulletsState(_bullets: BulletModel[]) {
    this.bullets.forEach(bullet => {
      const foundBullet = _bullets.find(_bullet => bullet.id === _bullet.id);
      if (foundBullet) {
        const size = bullet.size;
        Object.assign(bullet, foundBullet);
        if (bullet.size !== size) {
          bullet.updateObjectGeometry();
        }
      } else {
        bullet.remove(this.screen);
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }

  appendStaticObjects(newObjects: any[]) {
    newObjects.forEach(newObject => {
      let staticObject;
      if (newObject.shape === 'rectangle') {
        staticObject = new StaticRectangleObject(newObject);
      } else {
        staticObject = new StaticCircularObject(newObject);
      }
      staticObject.init(this.screen);
      this.staticObjects.push(staticObject);
    });
  }

  appendItemGenerators(newItemGenerators: ItemGeneratorAPI[]) {
    newItemGenerators.forEach((newItemGenerator: ItemGeneratorAPI) => {
      const itemGenerator = new Item(newItemGenerator);
      itemGenerator.init(this.screen);
      this.itemGenerators.push(itemGenerator);
    });
  }

  updateItemGenerator(updatedItemGenerator: ItemGeneratorAPI) {
    const itemGenerator = this.itemGenerators.find(
      itemGenerator => itemGenerator.id === updatedItemGenerator.id,
    );
    if (itemGenerator) {
      itemGenerator.ready = updatedItemGenerator.ready;
      itemGenerator.update();
    }
  }

  updateTimeToRevive(time: number) {
    if (time > 0) {
      this.text.show();
      this.text.setText(time.toString());
    } else {
      this.text.hide();
    }
  }

  removePlayer(id: string) {
    const disconnected = this.players.find((player: Player) => player.id === id);
    if (disconnected) {
      disconnected.remove();
      this.players.splice(this.players.indexOf(disconnected), 1);
    }
  }

  getUpdatedMouseCoordinates(e: MouseEvent): MouseCoordinates {
    if (this.currentPlayer) {
      this.cursor.x = e.clientX + this.currentPlayer.x - window.innerWidth / 2;
      this.cursor.y = -e.clientY + this.currentPlayer.y + window.innerHeight / 2;
      return this.getMouseCoordinates();
    }
  }

  getMouseCoordinates(): MouseCoordinates {
    return new MouseCoordinates(this.cursor.x, this.cursor.y, this.user.id);
  }

  updateObjects() {
    if (this.currentPlayer) {
      [this.camera, ...this.bullets, ...this.players, this.cursor, this.light, this.text].forEach(
        object => object.update(),
      );
    }
  }
  render() {
    if (this.camera) {
      this.screen.renderer.render(this.screen.scene, this.camera.object);
    }
  }

  update() {
    this.updatePlayerList();
    this.updateObjects();
  }

  updatePlayerList() {
    const playersList = this.players.map(({ name, kills, deaths, color, hp }) => ({
      name,
      kills,
      deaths,
      color,
      hp,
    }));
    const _playersListString = JSON.stringify(playersList);
    if (_playersListString !== this.playersListString) {
      this.playersListComponent.update(playersList);
      this.playersListString = _playersListString;
    }
  }

  updateWeaponInfo(info: { selectedWeapon: Item; weapons: string[] }) {
    this.weaponsListComponent.render(info);
  }

  updatePowersInfo(info: { selectedPower; powers; energy }) {
    this.powersListComponent.render(info);
  }
}
