import Item from './Item';
import { generateId } from '../helpers';

export default abstract class Power implements Item {
  id: number;
  type: string;
  active: boolean;
  cost: number;

  protected constructor() {
    this.id = generateId();
    this.active = false;
  }

  protected use(props: any) {}
  protected isActive() {}
  protected release() {}
  protected effect(props: any) {}
}
