import IUpdatable from '../interfaces/IUpdatable';
import Model3D from './Model3D';

export default class Item extends Model3D implements IUpdatable {
  ready: boolean;
  time: number;
  id: number;

  update() {
    this.object.visible = this.ready;
  }
}
