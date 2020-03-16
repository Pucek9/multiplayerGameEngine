import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';
import Zone from '../../models/Zone';
import ItemGenerator from '../../models/ItemGenerator';
import AK47 from '../../models/weapons/AK47';
import Pistol from '../../models/weapons/Pistol';
import Shotgun from '../../models/weapons/Shotgun';

export default class Boxes extends GameMap {
  mapName = 'Boxes';
  floor = 'grass';
  width = 2920;
  height = 2004;

  constructor() {
    super();
    this.setStaticObjects();
    this.setItemsGenerators();
    this.setZones();
  }

  setStaticObjects() {
    this.staticObjects = [
      new StaticRectangleObject({
        x: 1200,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: 800,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: 400,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: 0,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: -400,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: -800,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: -1200,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: 'yellow',
      }),
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
    this.itemGenerators = [
      new ItemGenerator({
        x: -1000,
        y: 800,
        size: 4,
        color: 'white',
        time: 5000,
        item: AK47,
        type: 'AK47',
      }),
      new ItemGenerator({
        x: -1000,
        y: 0,
        size: 4,
        color: 'brown',
        time: 10000,
        item: Pistol,
        type: 'Pistol',
      }),
      new ItemGenerator({
        x: -1000,
        y: -800,
        size: 4,
        color: 'red',
        time: 20000,
        item: Shotgun,
        type: 'Shotgun',
      }),
      new ItemGenerator({
        x: 1000,
        y: 800,
        size: 4,
        color: 'white',
        time: 5000,
        item: AK47,
        type: 'AK47',
      }),
      new ItemGenerator({
        x: 1000,
        y: 0,
        size: 4,
        color: 'brown',
        time: 10000,
        item: Pistol,
        type: 'Pistol',
      }),
      new ItemGenerator({
        x: 1000,
        y: -800,
        size: 4,
        color: 'red',
        time: 20000,
        item: Shotgun,
        type: 'Shotgun',
      }),
    ];
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
