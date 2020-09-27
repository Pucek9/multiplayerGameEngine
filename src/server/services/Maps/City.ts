import { BLUE, CITY, GREEN, RED, ROBOCOP_CITY, YELLOW } from '../../../shared/constants';
import { Item } from '../../../shared/models';

import ItemGenerator from '../../models/ItemGenerator';
import StaticCircularObject from '../../models/StaticCircularObject';
import StaticRectangleObject from '../../models/StaticRectangleObject';
import GameMap from './GameMap';

export default class City extends GameMap {
  mapName = CITY;
  floor = ROBOCOP_CITY;
  width = 2680;
  height = 3200;
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Item>[];

  constructor() {
    super();
    this.setStaticObjects();
    this.setItemsGenerators();
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
    this.itemGenerators = [];
  }

  setZones() {}
}
