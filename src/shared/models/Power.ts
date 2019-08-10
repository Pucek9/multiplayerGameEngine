import Item from './Item';
import { generateId } from '../helpers';
import Player from '../../server/models/Player';

export default abstract class Power implements Item {
  id: number;
  type: string;
  active: boolean;
  cost: number;

  protected constructor() {
    this.id = generateId();
    this.active = false;
  }

  protected use(owner?: Player, mouseClick?) {}
  protected isActive() {}
  protected release() {}
}
