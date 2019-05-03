import StaticCircularObject from './StaticCircularObject';

export default class Weapon extends StaticCircularObject {
  ready: boolean;
  time: number;
  id: number;

  render() {
    this.object.visible = this.ready;
  }
}
