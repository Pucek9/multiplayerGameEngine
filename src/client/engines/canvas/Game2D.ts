import {
  ItemGeneratorAPI,
  MouseCoordinates,
  NewPlayer,
  NewUser,
  PowersApiModel,
  WeaponsApiModel,
} from '../../../shared/apiModels';
import { CIRCLE, INVISIBLE, RECTANGLE } from '../../../shared/constants';
import { normalizeKey } from '../../../shared/helpers';
import { ObjectModel } from '../../../shared/interfaces';
import { BulletModel, PlayerModel, Team } from '../../../shared/models';

import CameraModel from '../../interfaces/CameraModel';
import { LightModel } from '../../interfaces/LightModel';
import PlayerListModel from '../../interfaces/PlayerListModel';
import ScreenModel from '../../interfaces/ScreenModel';
import { GameConfig } from '../../store/gamesList/state';
import PlayerListComponent from '../../UserInterface/PlayersList';
import PowersListComponent from '../../UserInterface/PowersList';
import TeamPlayerListComponent from '../../UserInterface/TeamPlayersList';
import WeaponsListComponent from '../../UserInterface/WeaponsList';
// import shaderService from '../three/ShaderService';
import Bullet from './models/Bullet';
import Camera from './models/Camera';
import Cursor from './models/Cursor';
import Item from './models/Item';
import Map from './models/Map';
import Player from './models/Player';
import StaticCircularObject from './models/StaticCircularObject';
import StaticRectangleObject from './models/StaticRectangleObject';
import Text from './models/Text';
// import { prepareCanvasScreen } from './scene';

const cursorPNG = require('../../games/balls/images/pointer.jpg');

export class CanvasRenderer {
  public domElement: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor() {
    this.domElement = document.createElement('canvas');
    this.domElement.setAttribute('id', 'canvas');
    this.setSize(window.innerWidth - 10, window.innerHeight - 10);
    this.ctx = this.domElement.getContext('2d');
  }

  setSize(width: number, height: number) {
    this.domElement.setAttribute('width', width.toString());
    this.domElement.setAttribute('height', height.toString());
  }
}
export function prepareCanvasScreen(gameConfig: GameConfig): ScreenModel {
  const scene = new Set();
  const renderer = new CanvasRenderer();
  const camera = new Camera[gameConfig.camera]();
  document.body.appendChild(renderer.domElement);

  return {
    scene,
    renderer,
    camera,
  };
}

export default class Game2D {
  user: NewUser;
  screen: ScreenModel;
  currentPlayer: Player;
  camera: CameraModel;
  light: LightModel;
  playersListComponent: PlayerListComponent | TeamPlayerListComponent;
  weaponsListComponent: WeaponsListComponent;
  powersListComponent: PowersListComponent;
  players: Player[] = [];
  teams: Team[] = [];
  playersListString = '';
  bullets: Bullet[] = [];
  keys: Set<string> = new Set([]);
  staticObjects = [];
  itemGenerators: Item[] = [];
  map: Map;
  cursor: Cursor;
  text: Text;

  constructor(user: NewUser, gameConfig: GameConfig) {
    this.user = user;
    this.screen = prepareCanvasScreen(gameConfig);
    this.teams = gameConfig.teams as Team[];
    this.playersListComponent = this.teams
      ? new TeamPlayerListComponent()
      : new PlayerListComponent();
    this.weaponsListComponent = new WeaponsListComponent();
    this.powersListComponent = new PowersListComponent();
    // this.light = new Lights[gameConfig.light](this.screen);
    this.text = new Text();
    this.map = new Map(gameConfig.map);
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
      this.screen.camera.init({
        observedObject: this.currentPlayer,
        map: this.map,
        renderer: this.screen.renderer,
      });
      // this.light.init({ source: this.currentPlayer, cursor: this.cursor, color: 0xff0000 });
      // this.currentPlayer.setLight(this.light);
    }
  }

  handleResize = () => {
    if (this.screen?.camera) {
      this.screen.camera.handleResize();
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
    this.screen.camera.wheel(e);
  }

  appendNewBullets(newBullets: BulletModel[]) {
    newBullets.forEach(newBullet => {
      const bullet = new Bullet(newBullet);
      bullet.init(this.screen);
      this.bullets.push(bullet);
    });
  }

  updateTeamsList(teams: Team[]) {
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
        // if (foundPlayer.speed > foundPlayer.baseSpeed && (diff.x !== 0 || diff.y !== 0)) {
        //   shaderService.turnOnShaders();
        // } else {
        //   shaderService.turnOffShaders();
        // }

        this.cursor.x = foundPlayer.cursor.x;
        this.cursor.y = foundPlayer.cursor.y;

        this.text.x = this.cursor.x;
        this.text.y = this.cursor.y;
      }
      if (foundPlayer) {
        const size = player.size;
        Object.assign(player, foundPlayer);
        if (player.size !== size) {
          // player.update();
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
          bullet.update();
        }
      } else {
        bullet.remove();
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
      }
    });
  }

  appendStaticObjects(newObjects: Array<ObjectModel>) {
    newObjects
      .filter(newObject => newObject.color !== INVISIBLE)
      .forEach(newObject => {
        let staticObject;
        if (newObject.shape === RECTANGLE) {
          staticObject = new StaticRectangleObject(newObject);
        } else if (newObject.shape === CIRCLE) {
          staticObject = new StaticCircularObject(newObject);
        }
        if (staticObject) {
          staticObject.init(this.screen);
          this.staticObjects.push(staticObject);
        }
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
      itemGen => itemGen.id === updatedItemGenerator.id,
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
    // this.screen.renderer.ctx.save();
    if (this.currentPlayer) {
      [
        this.screen.camera,
        this.map,
        ...this.staticObjects,
        ...this.bullets,
        ...this.players,
        ...this.itemGenerators,
        this.cursor,
        // this.light,
        this.text,
      ].forEach(object => object.update());
    }
    // this.screen.renderer.ctx.restore();
  }

  render() {
    // if (this.screen.camera?.object) {
    // this.screen.renderer.render(this.screen.scene, this.screen.camera.object);

    // this.screen.composer.render();
    this.update();
    // this.map.update();
    // this.cursor.update();
    // this.players.forEach(player => player.update());
    // this.cleaner.update();
    // }
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
    const _playersListString = JSON.stringify(playersList) + JSON.stringify(this.teams);
    if (_playersListString !== this.playersListString) {
      this.playersListComponent.update(playersList, this.teams);
      this.playersListString = _playersListString;
    }
  }

  updateWeaponInfo(info: WeaponsApiModel) {
    this.weaponsListComponent.render(info);
  }

  updatePowersInfo(info: PowersApiModel) {
    this.powersListComponent.render(info);
  }
}
