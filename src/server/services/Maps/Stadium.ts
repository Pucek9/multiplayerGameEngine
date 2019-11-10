import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';
import Zone from '../../models/Zone';
import ItemGenerator from '../../models/ItemGenerator';
import AK47 from '../../models/weapons/AK47';
import Pistol from '../../models/weapons/Pistol';
import Shotgun from '../../models/weapons/Shotgun';

export default class Stadium extends GameMap {
  mapName = 'Stadium';
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
      new StaticRectangleObject({
        x: 1450,
        y: -1000,
        z: 0,
        width: 100,
        height: 2000,
        depth: 100,
        color: 'red',
      }),
      new StaticRectangleObject({
        x: -1550,
        y: -1000,
        z: 0,
        width: 100,
        height: 2000,
        depth: 100,
        color: 'red',
      }),
      new StaticRectangleObject({
        x: -1550,
        y: 1000,
        z: 0,
        width: 3100,
        height: 100,
        depth: 100,
        color: 'red',
      }),
      new StaticRectangleObject({
        x: -1550,
        y: -1050,
        z: 0,
        width: 3100,
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
        x: -1000,
        y: 0,
        width: 100,
        height: 1000,
      }),
      new Zone({
        x: 1000,
        y: 0,
        width: 100,
        height: 1000,
      }),
    ];
  }
}
