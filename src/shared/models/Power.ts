import { generateId } from '../helpers';
import { Item } from './Item';

export abstract class Power implements Item {
  id: number;
  type: string;
  active: boolean;
  cost: number;

  public constructor() {
    this.id = generateId();
    this.active = false;
  }

  use(props) {}

  isActive() {}

  release(props) {}

  effect(props) {}
}
