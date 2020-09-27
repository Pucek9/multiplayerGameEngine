import { CITY, ROBOCOP_CITY } from '../../../shared/constants';
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
    this.staticObjects = [];
  }

  setItemsGenerators() {
    this.itemGenerators = [];
  }

  setZones() {}
}
