import { CircularObjectModel } from '../models';

export class ItemGeneratorAPI extends CircularObjectModel {
  ready: boolean;
  type: string;
  time: number;
  id: number;

  constructor(params: ItemGeneratorAPI) {
    super(params);
  }
}
