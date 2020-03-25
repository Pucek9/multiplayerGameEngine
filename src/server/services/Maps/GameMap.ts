import ItemGenerator from '../../models/ItemGenerator';
import Item from '../../../shared/models/Item';
import StaticCircularObject from '../../models/StaticCircularObject';
import StaticRectangleObject from '../../models/StaticRectangleObject';
import Zone from '../../models/Zone';
import MapModel from '../../../shared/models/MapModel';

export default abstract class GameMap implements MapModel {
  zones: Zone[];
  mapName: string;
  floor: string;
  width: number;
  height: number;
  staticObjects: (StaticRectangleObject | StaticCircularObject)[];
  itemGenerators: ItemGenerator<Item>[];

  abstract setStaticObjects();
  abstract setItemsGenerators();
  abstract setZones();

  getMapName(): string {
    return this.mapName;
  }

  getStaticObjects(): (StaticRectangleObject | StaticCircularObject)[] {
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
