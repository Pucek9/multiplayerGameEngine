import Item from '../../shared/models/Item';
import { generateId } from '../../shared/helpers';

export default class AidKit implements Item {
  type: 'AidKit';
  id: number;
  volume: number;

  constructor(params: Partial<AidKit>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
