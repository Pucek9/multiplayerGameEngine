import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';
import Zone from '../../models/Zone';
import Goal from '../../models/Goal';
import { STADIUM } from "../../../shared/constants/maps";

export default class Stadium extends GameMap {
  mapName = STADIUM;
  floor = 'stadiumGrass';
  width = 1184;
  height = 762;

  constructor() {
    super();
    this.setStaticObjects();
    this.setItemsGenerators();
    this.setZones();
  }

  setStaticObjects() {
    this.staticObjects = [
      new Goal({
        x: 512,
        y: -57,
        width: 20,
        height: 112,
        z: 0,
        depth: 50,
        color: 'white',
        team: '',
      }),
      new Goal({
        x: -532,
        y: -57,
        width: 20,
        height: 112,
        z: 0,
        depth: 50,
        color: 'white',
        team: '',
      }),
      //right
      new StaticRectangleObject({
        x: 600,
        y: -400,
        z: 0,
        width: 100,
        height: 900,
        depth: 100,
        color: 'red',
      }),
      //left
      new StaticRectangleObject({
        x: -700,
        y: -400,
        z: 0,
        width: 100,
        height: 900,
        depth: 100,
        color: 'red',
      }),
      //up
      new StaticRectangleObject({
        x: -600,
        y: 390,
        z: 0,
        width: 1400,
        height: 100,
        depth: 100,
        color: 'red',
      }),
      //down
      new StaticRectangleObject({
        x: -700,
        y: -490,
        z: 0,
        width: 1400,
        height: 100,
        depth: 100,
        color: 'red',
      }),
    ];
  }

  setItemsGenerators() {
    this.itemGenerators = [];
  }

  setZones() {
    this.zones = [
      new Zone({
        x: -600,
        y: -500,
        width: 600,
        height: 800,
      }),
      new Zone({
        x: 0,
        y: -500,
        width: 600,
        height: 800,
      }),
    ];
  }
}
