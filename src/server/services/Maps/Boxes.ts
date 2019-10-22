import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';
import StaticCircularObject from '../../models/StaticCircularObject';
import ItemGenerator from '../../models/ItemGenerator';
import Item from '../../../shared/models/Item';
import Grenade from '../../models/weapons/Grenade';

export default class Boxes implements GameMap {
  mapName: string = 'Boxes';
  width = 2920;
  height = 2004;
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Item>[];

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
        x: 1100,
        y: 100,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
      new ItemGenerator({
        x: 1100,
        y: 600,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
      new ItemGenerator({
        x: -1100,
        y: 600,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
      new ItemGenerator({
        x: -1100,
        y: 100,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
      new ItemGenerator({
        x: 250,
        y: 600,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
      new ItemGenerator({
        x: 250,
        y: 100,
        size: 8,
        color: 'black',
        time: 8000,
        item: Grenade,
        type: 'Grenade',
      }),
    ];
  }

  getMapName(): string {
    return this.mapName;
  }

  getStaticObjects(): (StaticRectangleObject | StaticCircularObject)[] {
    return this.staticObjects;
  }

  getItemGenerators(): ItemGenerator<Item>[] {
    return this.itemGenerators;
  }
}
