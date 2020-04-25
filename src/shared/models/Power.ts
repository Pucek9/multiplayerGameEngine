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

  abstract use(props: any);

  abstract isActive();

  abstract release(props: any);

  abstract effect(props: any);
}
