import Player from './models/Player';
import Camera from './models/Camera';
import Bullet from './models/Bullet';
import StaticRectangleObject from './models/StaticRectangleObject';
import StaticCircularObject from './models/StaticCircularObject';

import { Lighting } from './models/Light/Light';
import Lights from './models/Light/index';

import PlayerListComponent from './UserInterface/PlayersList';
import WeaponsListComponent from './UserInterface/WeaponsList';
import PowersListComponent from './UserInterface/PowersList';
import Map from './models/Map';
import Cursor from './models/Cursor';
import ScreenModel from './interfaces/ScreenModel';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewUser from '../shared/apiModels/NewUser';
import NewPlayer from '../shared/apiModels/NewPlayer';
import PlayerModel from '../shared/models/PlayerModel';
import { normalizeKey } from '../shared/helpers';
import Item from './models/Item';
import ItemGeneratorAPI from '../shared/apiModels/ItemGenerator';
import ICamera from './models/Camera/ICamera';
import BulletModel from '../shared/models/BulletModel';
import Text from './models/Text';
import { GameConfig } from './store/gamesList/state';
import TeamPlayerListComponent from './UserInterface/TeamPlayersList';
import { gamesListService } from './store/store';
import PlayerListModel from './interfaces/PlayerListModel';

const mapJPG = require('./games/balls/images/test.jpg');
const cursorPNG = require('./games/balls/images/pointer.jpg');

export default class Game {
  user: NewUser;
  screen: ScreenModel;
  currentPlayer: Player;
  camera: ICamera;
  light: Lighting;
  playersListComponent: PlayerListComponent | TeamPlayerListComponent;
  weaponsListComponent: WeaponsListComponent;
  powersListComponent: PowersListComponent;
  players: Player[] = [];
  teams = [];
  playersListString: string = '';
  bullets: Bullet[] = [];
  keys: Set<string> = new Set([]);
  staticObjects: any[] = [];
  itemGenerators: Item[] = [];
  map: Map;
  cursor: Cursor;
  text: Text;

  constructor(user: NewUser, screen: ScreenModel, gameConfig: GameConfig) {
    this.user = user;
    this.screen = screen;
    this.light = new Lights[gameConfig.light](this.screen);
    this.camera = new Camera[gameConfig.camera]();
    this.teams = gameConfig.teams;
    this.playersListComponent = this.teams
      ? new TeamPlayerListComponent()
      : new PlayerListComponent();
    this.weaponsListComponent = new WeaponsListComponent();
    this.powersListComponent = new PowersListComponent();
    this.text = new Text();
    this.map = new Map(mapJPG);
    this.cursor = new Cursor(cursorPNG);
    this.map.init(this.screen);
    this.text.init(this.screen, this.camera);
    this.cursor.init(this.screen);
    this.playersListComponent.show();
    this.weaponsListComponent.show();
    this.powersListComponent.show();
  }

  appendNewPlayer(newPlayer: NewPlayer) {
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.team,
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
      this.camera.init({ activePlayer: this.currentPlayer, cursor: this.cursor });
      this.light.init({ source: this.currentPlayer, cursor: this.cursor, color: 0xff0000 });
      this.currentPlayer.setLight(this.light);
    }
  }

  handleResize = () => {
    if (this.camera?.object && this.screen) {
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
          newPlayer.team,
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

  updateTeamsList(teams) {
    this.teams = teams;
  }

  updatePlayersState(_players: PlayerModel[]) {
    this.players.forEach(player => {
      const foundPlayer = _players.find(_player => player.id === _player.id);
      if (foundPlayer?.id === this.currentPlayer?.id) {
        // const diff = {
        //   x: player.x - foundPlayer.x,
        //   y: player.y - foundPlayer.y,
        // };
        // this.cursor.x -= diff.x;
        // this.cursor.y -= diff.y;
        this.cursor.x = foundPlayer.cursor.x;
        this.cursor.y = foundPlayer.cursor.y;

        this.text.x = this.cursor.x;
        this.text.y = this.cursor.y;
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
      this.text.setText(' ' + time);
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
      return {
        clientX: e.clientX,
        clientY: e.clientY,
        movementX: e.movementX,
        movementY: e.movementY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        owner: this.currentPlayer.id,
      };
    }
  }

  getUserID(): string {
    return this.user.id;
  }

  updateObjects() {
    if (this.currentPlayer) {
      [this.camera, ...this.bullets, ...this.players, this.cursor, this.light, this.text].forEach(
        object => object.update(),
      );
    }
  }

  render() {
    if (this.camera?.object) {
      this.screen.renderer.render(this.screen.scene, this.camera.object);
    }
  }

  update() {
    this.updatePlayerList();
    this.updateObjects();
  }

  normalizedPlayerList(): Array<PlayerListModel> {
    return this.players.map(({ name, kills, deaths, color, hp, team }) => ({
      name,
      kills,
      deaths,
      color,
      hp,
      team,
    }));
  }

  updatePlayerList() {
    const playersList = this.normalizedPlayerList();
    const _playersListString = JSON.stringify(playersList);
    if (_playersListString !== this.playersListString) {
      this.playersListComponent.update(playersList, this.teams);
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
