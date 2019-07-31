import StaticCircularObject from './StaticCircularObject';
import IUpdatable from '../interfaces/IUpdatable';

export default class Item extends StaticCircularObject implements IUpdatable {
  ready: boolean;
  time: number;
  id: number;

  update() {
    this.object.visible = this.ready;
  }
}
