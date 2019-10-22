import StaticCircularObject from '../../models/StaticCircularObject';
import StaticRectangleObject from '../../models/StaticRectangleObject';
import Pistol from '../../models/weapons/Pistol';
import ItemGenerator from '../../models/ItemGenerator';
import GameMap from './GameMap';
import Item from '../../../shared/models/Item';
import Shotgun from '../../models/weapons/Shotgun';
import Resizer from '../../models/weapons/Resizer';
import Grenade from '../../models/weapons/Grenade';
import AK47 from '../../models/weapons/AK47';
import AidKit from '../../models/AidKit';

export default class Playground implements GameMap {
  mapName: string = 'Playground';
  width = 2920;
  height = 2004;
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Item>[];

  constructor() {
    this.staticObjects = [
      new StaticCircularObject({ x: 100, y: 250, size: 100, color: 'red' }),
      new StaticCircularObject({ x: 1000, y: 250, size: 90, color: 'blue' }),
      new StaticCircularObject({ x: 500, y: 450, size: 30, color: 'purple' }),
      new StaticCircularObject({ x: -1050, y: -180, size: 120, color: 'red' }),
      new StaticCircularObject({ x: -600, y: -600, size: 100, color: 'blue' }),
      new StaticCircularObject({ x: -200, y: -700, size: 130, color: 'yellow' }),
      new StaticCircularObject({ x: 500, y: -700, size: 80, color: 'red' }),
      new StaticCircularObject({ x: -1200, y: 850, size: 90, color: 'green' }),
      new StaticRectangleObject({
        x: 500,
        y: 350,
        z: 0,
        width: 500,
        height: 100,
        depth: 200,
        color: 'green',
        deg: 45,
      }),
      new StaticRectangleObject({
        x: 230,
        y: 220,
        z: 0,
        width: 200,
        height: 80,
        depth: 80,
        color: 'blue',
        deg: -30,
      }),
      new StaticRectangleObject({
        x: -230,
        y: 420,
        z: 0,
        width: 80,
        height: 300,
        depth: 80,
        color: 'yellow',
        deg: 50,
      }),
      new StaticRectangleObject({
        x: -920,
        y: 600,
        z: 0,
        width: 400,
        height: 150,
        depth: 80,
        color: 'red',
        deg: -130,
      }),
      new StaticRectangleObject({
        x: -730,
        y: 220,
        z: 0,
        width: 200,
        height: 120,
        depth: 120,
        color: 'blue',
        deg: 120,
      }),
      new StaticRectangleObject({
        x: 900,
        y: -500,
        z: 0,
        width: 400,
        height: 400,
        depth: 10,
        color: 'pink',
      }),
      new StaticRectangleObject({
        x: -400,
        y: -450,
        z: 0,
        width: 300,
        height: 300,
        depth: 10,
        color: 'pink',
        deg: -70,
      }),
      new StaticRectangleObject({
        x: 1300,
        y: 170,
        z: 0,
        width: 100,
        height: 300,
        depth: 100,
        color: 'yellow',
      }),
      new StaticRectangleObject({
        x: -1200,
        y: -390,
        z: 0,
        width: 600,
        height: 80,
        depth: 120,
        color: 'green',
        deg: 40,
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
      new StaticRectangleObject({
        x: -1550,
        y: 0,
        z: 0,
        width: 400,
        height: 100,
        depth: 100,
        color: 'blue',
      }),
      new StaticRectangleObject({
        x: -1000,
        y: 0,
        z: 0,
        width: 2000,
        height: 100,
        depth: 100,
        color: 'blue',
      }),
      new StaticRectangleObject({
        x: 1150,
        y: 0,
        z: 0,
        width: 400,
        height: 100,
        depth: 100,
        color: 'blue',
      }),
    ];
    this.itemGenerators = [
      new ItemGenerator({
        x: 1350,
        y: 150,
        size: 4,
        color: 'brown',
        time: 10000,
        item: Pistol,
        type: 'Pistol',
      }),
      new ItemGenerator({
        x: 200,
        y: 500,
        size: 4,
        color: 'red',
        time: 20000,
        item: Shotgun,
        type: 'Shotgun',
      }),
      new ItemGenerator({
        x: -500,
        y: 200,
        size: 4,
        color: 'yellow',
        time: 30000,
        item: Resizer,
        type: 'Resizer',
      }),
      new ItemGenerator({
        x: -800,
        y: -600,
        size: 4,
        color: 'brown',
        time: 10000,
        item: Pistol,
        type: 'Pistol',
      }),
      new ItemGenerator({
        x: 1350,
        y: -500,
        size: 4,
        color: 'red',
        time: 20000,
        item: Shotgun,
        type: 'Shotgun',
      }),
      new ItemGenerator({
        x: -1200,
        y: -900,
        size: 8,
        color: 'black',
        time: 10000,
        item: Grenade,
        type: 'Grenade',
      }),
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
        x: 1350,
        y: -900,
        size: 4,
        color: 'white',
        time: 5000,
        item: AidKit,
        type: 'AidKit',
        itemProps: { hp: 50, energy: 100 },
      }),
      new ItemGenerator({
        x: -1350,
        y: 900,
        size: 4,
        color: 'white',
        time: 5000,
        item: AidKit,
        type: 'AidKit',
        itemProps: { hp: 50, energy: 100 },
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
