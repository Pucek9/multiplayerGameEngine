import StaticRectangleObject from '../models/StaticRectangleObject';
import GameMap from './GameMap';
import StaticCircularObject from '../models/StaticCircularObject';
import ItemGenerator from '../models/ItemGenerator';
import Weapon from '../models/weapons/Weapon';
import Pistol from '../models/weapons/Pistol';

export default class Prototype2 implements GameMap {
  mapName: string = 'Prototype2';
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Weapon>[];

  constructor() {
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
    ];
    this.itemGenerators = [
      new ItemGenerator({
        x: 1300,
        y: 10,
        size: 30,
        color: 'brown',
        time: 10000,
        weapon: Pistol,
      }),
    ];
  }

  getMapName() {
    return this.mapName;
  }

  getStaticObjects() {
    return this.staticObjects;
  }

  getItemGenerators() {
    return this.itemGenerators;
  }
}
