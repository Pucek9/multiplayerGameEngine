import StaticCircularObjectModel from '../models/StaticCircularObjectModel';
import ItemGenerator from '../../server/models/ItemGenerator';
import Item from '../models/Item';

export default class ItemGeneratorAPI extends StaticCircularObjectModel {
  ready: boolean;
  type: string;
  time: number;
  id: number;

  constructor(params: ItemGeneratorAPI) {
    super(params);
  }
}
