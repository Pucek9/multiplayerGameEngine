import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';
import Zone from '../../models/Zone';
import ItemGenerator from "../../models/ItemGenerator";
import AK47 from "../../models/weapons/AK47";

export default class Boxes extends GameMap {
  mapName = 'Boxes';
  width = 2920;
  height = 2004;

  constructor() {
    super();
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
        x: 1000,
        y: 800,
        size: 4,
        color: 'white',
        time: 5000,
        item: AK47,
        type: 'AK47',
      }),
    ];
    this.zones = [
      new Zone({
        x: -1450,
        y: -1000,
        width: 100,
        height: 2000,
      }),
      new Zone({
        x: -1350,
        y: -1000,
        width: 100,
        height: 2000,
      }),
    ];
  }
}
