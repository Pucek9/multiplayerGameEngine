import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';
import Pistol from '../models/weapons/Pistol';
import Shotgun from '../models/weapons/Shotgun';
import ItemGenerator from '../models/ItemGenerator';

export default class Prototype1 {
  private static mapName: string = 'Prototype1';

  constructor() {}

  static getMapName() {
    return this.mapName;
  }

  static getStaticObjects() {
    return [
      new StaticCircularObject({ x: 100, y: 200, size: 100, color: 'red' }),
      new StaticCircularObject({ x: 1000, y: 200, size: 90, color: 'blue' }),
      new StaticCircularObject({ x: 500, y: 400, size: 30, color: 'purple' }),
      new StaticRectangleObject({
        x: 500,
        y: 300,
        z: 0,
        width: 500,
        height: 100,
        depth: 200,
        color: 'green',
        deg: 45,
      }),
      new StaticRectangleObject({
        x: 230,
        y: 170,
        z: 0,
        width: 200,
        height: 80,
        depth: 80,
        color: 'blue',
        deg: -30,
      }),
      new StaticRectangleObject({
        x: -400,
        y: -500,
        z: 0,
        width: 300,
        height: 300,
        depth: 10,
        color: 'pink',
        deg: -70,
      }),
      new StaticRectangleObject({
        x: 1300,
        y: 30,
        z: 0,
        width: 100,
        height: 300,
        depth: 100,
        color: 'yellow',
      }),
    ];
  }

  static getItemGenerators() {
    return [
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
}
