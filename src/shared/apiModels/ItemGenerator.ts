import { StaticCircularObjectModel } from '../models';

export class ItemGeneratorAPI extends StaticCircularObjectModel {
  ready: boolean;
  type: string;
  time: number;
  id: number;

  constructor(params: ItemGeneratorAPI) {
    super(params);
  }
}
