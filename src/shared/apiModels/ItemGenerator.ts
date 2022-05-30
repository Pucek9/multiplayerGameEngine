import { CommonObjectModel } from '../models';

export class ItemGeneratorAPI extends CommonObjectModel {
  ready: boolean;
  type: string;
  time: number;
  id: number;

  constructor(params: ItemGeneratorAPI) {
    super(params);
  }
}
