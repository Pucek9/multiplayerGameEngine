import IRenderable from '../interfaces/IRenderable';
import { ScreenModel } from '../types/ScreenModel';

export default class Cleaner implements IRenderable {
  constructor(public screen: ScreenModel) {}

  render() {
    // this.screen.ctx.clearRect(
    //     0,
    //     0,
    //     this.screen.canvas.width,
    //     this.screen.canvas.height
    // );
  }
}
