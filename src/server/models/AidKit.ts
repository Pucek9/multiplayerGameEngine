import Item from '../../shared/models/Item';
import { AID_KIT } from '../../shared/constants/other';
import { generateId } from '../../shared/helpers';

export default class AidKit implements Item {
  type = AID_KIT;
  id: number;
  hp: number;
  energy: number;
  speed?: boolean;
  size?: boolean;

  constructor(params: Partial<AidKit>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
