import ItemGenerator from '../models/ItemGenerator';
import Item from '../../shared/models/Item';
import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';

export default interface GameMap {
  mapName: string;

  getMapName(): string;

  getStaticObjects(): (StaticRectangleObject | StaticCircularObject)[];

  getItemGenerators(): ItemGenerator<Item>[];
}
