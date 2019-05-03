import ItemGenerator from '../models/ItemGenerator';
import Item from '../../shared/models/Item';

export default interface GameMap {
  mapName: string;

  getMapName(): string;

  getStaticObjects(): any[];

  getItemGenerators(): ItemGenerator<Item>[];
}
