import { convertRectangle } from '../../shared/canvasHelpers';
import { RECTANGLE } from '../../shared/constants';
import { Item, MapModel } from '../../shared/models';

import CircularObject from '../models/CircularObject';
import ItemGenerator from '../models/ItemGenerator';
import * as items from '../models/items';
import RectangleObject from '../models/RectangleObject';
import * as objects from '../models/staticObjects';
import Zone from '../models/Zone';

export default class GameMap implements MapModel {
  mapName: string;
  floor: string;
  width: number;
  height: number;
  staticObjects: (RectangleObject | CircularObject)[] = [];
  itemGenerators: ItemGenerator<Item>[] = [];
  zones: Zone[] = [];

  constructor(mapName: string) {
    this.loadMap(mapName);
  }

  loadMap(mapName: string) {
    const map = require(`../maps/${mapName}.json`);
    this.mapName = map.mapName;
    this.floor = map.floor;
    this.width = map.width;
    this.height = map.height;
    // console.log(JSON.stringify(map));
    this.setStaticObjects(map.staticObjects);
    this.setItemsGenerators(map.itemGenerators);
    this.setZones(map.zones);
  }

  getSerializedMap() {
    return this.serializeMap();
  }

  serializeMap() {
    return {
      mapName: this.mapName,
      floor: this.floor,
      width: this.width,
      height: this.height,
      staticObjects: this.staticObjects.map(staticObject => ({ ...staticObject })),
      itemGenerators: this.itemGenerators.map(itemGenerator => ({
        ...itemGenerator,
        ItemClass: itemGenerator.ItemClass.name,
      })),
      zones: this.zones.map(zone => ({ ...zone })),
    };
  }

  setStaticObjects(staticObjects) {
    this.staticObjects = staticObjects.map(
      staticObject => new objects[staticObject.type](staticObject),
    );
    this.staticObjects
      .filter(o => o.shape === RECTANGLE)
      .forEach(object => console.log(convertRectangle(object as RectangleObject)));
  }
  setItemsGenerators(itemGenerators) {
    this.itemGenerators = itemGenerators.map(
      itemGenerator =>
        new ItemGenerator({ ...itemGenerator, ItemClass: items[itemGenerator.ItemClass] }),
    );
  }

  setZones(zones) {
    this.zones = zones.map(zone => new Zone(zone));
  }

  getMapName(): string {
    return this.mapName;
  }

  getStaticObjects(): (RectangleObject | CircularObject)[] {
    return this.staticObjects;
  }

  getItemGenerators(): ItemGenerator<Item>[] {
    return this.itemGenerators;
  }

  deleteItemGenerator(itemGenerator: ItemGenerator<Item>) {
    const index = this.getItemGenerators().findIndex(itemGen => itemGen.id === itemGenerator.id);
    if (index !== -1) {
      this.itemGenerators.splice(index, 1);
    }
  }
}
