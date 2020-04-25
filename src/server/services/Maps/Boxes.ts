import {
  AK47,
  BOXES,
  BROWN,
  GRASS,
  PISTOL,
  RED,
  SHOTGUN,
  WHITE,
  YELLOW,
} from '../../../shared/constants';

import ItemGenerator from '../../models/ItemGenerator';
import StaticRectangleObject from '../../models/StaticRectangleObject';
import Ak47 from '../../models/weapons/Ak47';
import Pistol from '../../models/weapons/Pistol';
import Shotgun from '../../models/weapons/Shotgun';
import Zone from '../../models/Zone';
import GameMap from './GameMap';

export default class Boxes extends GameMap {
  mapName = BOXES;
  floor = GRASS;
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
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: 800,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: 400,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: 0,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: -400,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: -800,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
      }),
      new StaticRectangleObject({
        x: -1200,
        y: 30,
        z: 0,
        width: 100,
        height: 800,
        depth: 10,
        color: YELLOW,
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
    ];
  }

  setItemsGenerators() {
    this.itemGenerators = [
      new ItemGenerator({
        ItemClass: Ak47,
        x: -1000,
        y: 800,
        size: 4,
        color: WHITE,
        time: 5000,
      }),
      new ItemGenerator({
        ItemClass: Pistol,
        x: -1000,
        y: 0,
        size: 4,
        color: BROWN,
        time: 10000,
      }),
      new ItemGenerator({
        ItemClass: Shotgun,
        x: -1000,
        y: -800,
        size: 4,
        color: RED,
        time: 20000,
      }),
      new ItemGenerator({
        ItemClass: Ak47,
        x: 1000,
        y: 800,
        size: 4,
        color: WHITE,
        time: 5000,
      }),
      new ItemGenerator({
        ItemClass: Pistol,
        x: 1000,
        y: 0,
        size: 4,
        color: BROWN,
        time: 10000,
      }),
      new ItemGenerator({
        ItemClass: Shotgun,
        x: 1000,
        y: -800,
        size: 4,
        color: RED,
        time: 20000,
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
