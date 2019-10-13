import StaticCircularObjectModel from '../models/StaticCircularObjectModel';

export default class ItemGeneratorAPI extends StaticCircularObjectModel {
  ready: boolean;
  type: string;
  time: number;
  id: number;

  constructor(params: ItemGeneratorAPI) {
    super(params);
  }
}
