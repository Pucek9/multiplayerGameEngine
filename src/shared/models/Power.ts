import Item from './Item';
import { generateId } from '../helpers';

export default abstract class Power implements Item {
  id: number;
  type: string;
  active: boolean;
  cost: number;

  public constructor() {
    this.id = generateId();
    this.active = false;
  }

  public use(props: any) {}

  public isActive() {}

  public release(props: any) {}

  public effect(props: any) {}
}
