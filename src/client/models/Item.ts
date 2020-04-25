import Updatable from '../interfaces/Updatable';
import Model3D from './Model3D';

export default class Item extends Model3D implements Updatable {
  ready: boolean;
  time: number;
  id: number;

  update() {
    if (this.object) {
      this.object.visible = this.ready;
    }
  }
}
