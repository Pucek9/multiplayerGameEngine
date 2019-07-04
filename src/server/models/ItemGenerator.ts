import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import { generateId } from '../../shared/helpers';
import Item from '../../shared/models/Item';

interface ParameterlessConstructor<T> {
  new (Item?): T;
}

export default class ItemGenerator<T> extends StaticCircularObjectModel {
  item: ParameterlessConstructor<Item>;
  itemProps: any;
  ready = true;
  type: string;
  time: number;
  id: number;

  constructor(params: Partial<ItemGenerator<Item>>) {
    super(params);
    this.id = params.id || generateId();
    this.itemProps = params.itemProps || {};
    Object.assign(this, params);
    Object.seal(this);
  }

  isReady() {
    return this.ready;
  }

  activate() {
    this.ready = true;
  }

  deactivate() {
    this.ready = false;
  }

  generateItem(): Item {
    return new this.item(this.itemProps);
  }
}
