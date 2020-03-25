import {
  AID_KIT,
  AK47,
  BLACK,
  BLUE,
  BROWN,
  GRASS,
  GREEN,
  GRENADE,
  LAND_MINE,
  PISTOL,
  PLAYGROUND,
  PURPLE,
  RED,
  RESIZER,
  SHOTGUN,
  WHITE,
  YELLOW,
} from '../../../shared/constants';
import Item from '../../../shared/models/Item';
import AidKit from '../../models/AidKit';
import ItemGenerator from '../../models/ItemGenerator';
import StaticCircularObject from '../../models/StaticCircularObject';
import StaticRectangleObject from '../../models/StaticRectangleObject';
import Ak47 from '../../models/weapons/Ak47';
import Grenade from '../../models/weapons/Grenade';
import LandMine from '../../models/weapons/LandMine';
import Pistol from '../../models/weapons/Pistol';
import Resizer from '../../models/weapons/Resizer';
import Shotgun from '../../models/weapons/Shotgun';
import GameMap from './GameMap';

export default class Playground extends GameMap {
  mapName = PLAYGROUND;
  floor = GRASS;
  width = 2920;
  height = 2004;
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Item>[];

  constructor() {
    super();
    this.setStaticObjects();
    this.setItemsGenerators();
  }

  setStaticObjects() {
    this.staticObjects = [
      new StaticCircularObject({ x: 100, y: 250, size: 100, color: RED }),
      new StaticCircularObject({ x: 1000, y: 250, size: 90, color: BLUE }),
      new StaticCircularObject({ x: 500, y: 450, size: 30, color: PURPLE }),
      new StaticCircularObject({ x: -1050, y: -180, size: 120, color: RED }),
      new StaticCircularObject({ x: -600, y: -600, size: 100, color: BLUE }),
      new StaticCircularObject({ x: -200, y: -700, size: 130, color: YELLOW }),
      new StaticCircularObject({ x: 500, y: -700, size: 80, color: RED }),
      new StaticCircularObject({ x: -1200, y: 850, size: 90, color: GREEN }),
      new StaticRectangleObject({
        x: 500,
        y: 350,
        z: 0,
        width: 500,
        height: 100,
        depth: 200,
        color: GREEN,
        deg: 45,
      }),
      new StaticRectangleObject({
        x: 230,
        y: 220,
        z: 0,
        width: 200,
        height: 80,
        depth: 80,
        color: BLUE,
        deg: -30,
      }),
      new StaticRectangleObject({
        x: -230,
        y: 420,
        z: 0,
        width: 80,
        height: 300,
        depth: 80,
        color: YELLOW,
        deg: 50,
      }),
      new StaticRectangleObject({
        x: -920,
        y: 600,
        z: 0,
        width: 400,
        height: 150,
        depth: 80,
        color: RED,
        deg: -130,
      }),
      new StaticRectangleObject({
        x: -730,
        y: 220,
        z: 0,
        width: 200,
        height: 120,
        depth: 120,
        color: BLUE,
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
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: -1200,
        y: -390,
        z: 0,
        width: 600,
        height: 80,
        depth: 120,
        color: GREEN,
        deg: 40,
      }),
      new StaticRectangleObject({
        x: 1450,
        y: -1000,
        z: 0,
        width: 100,
        height: 2000,
        depth: 100,
        color: RED,
      }),
      new StaticRectangleObject({
        x: -1550,
        y: -1000,
        z: 0,
        width: 100,
        height: 2000,
        depth: 100,
        color: RED,
      }),
      new StaticRectangleObject({
        x: -1550,
        y: 1000,
        z: 0,
        width: 3100,
        height: 100,
        depth: 100,
        color: RED,
      }),
      new StaticRectangleObject({
        x: -1550,
        y: -1050,
        z: 0,
        width: 3100,
        height: 100,
        depth: 100,
        color: RED,
      }),
      new StaticRectangleObject({
        x: -1550,
        y: 0,
        z: 0,
        width: 400,
        height: 100,
        depth: 100,
        color: BLUE,
      }),
      new StaticRectangleObject({
        x: -1000,
        y: 0,
        z: 0,
        width: 2000,
        height: 100,
        depth: 100,
        color: BLUE,
      }),
      new StaticRectangleObject({
        x: 1150,
        y: 0,
        z: 0,
        width: 400,
        height: 100,
        depth: 100,
        color: BLUE,
      }),
    ];
  }

  setItemsGenerators() {
    this.itemGenerators = [
      new ItemGenerator({
        x: 1350,
        y: 150,
        size: 4,
        color: BROWN,
        time: 10000,
        item: Pistol,
        type: PISTOL,
      }),
      new ItemGenerator({
        x: 200,
        y: 500,
        size: 4,
        color: RED,
        time: 20000,
        item: Shotgun,
        type: SHOTGUN,
      }),
      new ItemGenerator({
        x: -500,
        y: 200,
        size: 4,
        color: YELLOW,
        time: 30000,
        item: Resizer,
        type: RESIZER,
      }),
      new ItemGenerator({
        x: -800,
        y: -600,
        size: 4,
        color: BROWN,
        time: 10000,
        item: Pistol,
        type: PISTOL,
      }),
      new ItemGenerator({
        x: 1350,
        y: -500,
        size: 4,
        color: RED,
        time: 20000,
        item: Shotgun,
        type: SHOTGUN,
      }),
      new ItemGenerator({
        x: -1200,
        y: -900,
        size: 8,
        color: BLACK,
        time: 10000,
        item: Grenade,
        type: GRENADE,
      }),
      new ItemGenerator({
        x: 1350,
        y: 900,
        size: 8,
        color: BLACK,
        time: 10000,
        item: LandMine,
        type: LAND_MINE,
      }),
      new ItemGenerator({
        x: -1000,
        y: 800,
        size: 4,
        color: WHITE,
        time: 5000,
        item: Ak47,
        type: AK47,
      }),
      new ItemGenerator({
        x: 1350,
        y: -900,
        size: 4,
        color: WHITE,
        time: 5000,
        item: AidKit,
        type: AID_KIT,
        itemProps: { hp: 50, energy: 100, speed: true, size: true },
      }),
      new ItemGenerator({
        x: -1350,
        y: 900,
        size: 4,
        color: WHITE,
        time: 5000,
        item: AidKit,
        type: AID_KIT,
        itemProps: { hp: 50, energy: 100, speed: true, size: true },
      }),
    ];
  }

  setZones() {}
}
