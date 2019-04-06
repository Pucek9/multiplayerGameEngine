import StaticCircularObject from './StaticCircularObject';

export default class Weapon extends StaticCircularObject {
  ready: boolean;
  time: number;

  render() {
    this.object.visible = this.ready;
    setTimeout(() => {
      this.ready = true;
      this.object.visible = this.ready;
    }, this.time);
  }
}
