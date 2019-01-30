import IRenderable from '../interfaces/IRenderable';
import { Screen } from '../types/Screen';

export default class Cleaner implements IRenderable {
  constructor(public screen: Screen) {}

  render() {
    // this.screen.ctx.clearRect(
    //     0,
    //     0,
    //     this.screen.canvas.width,
    //     this.screen.canvas.height
    // );
  }
}
