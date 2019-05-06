import StaticCircularObject from './StaticCircularObject';
import IRenderable from '../interfaces/IRenderable';

export default class Item extends StaticCircularObject implements IRenderable {
  ready: boolean;
  time: number;
  id: number;

  render() {
    this.object.visible = this.ready;
  }
}
