import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class Cleaner implements Updatable {
  constructor() {}
  screen: ScreenModel;
  init(screen: ScreenModel) {
    this.screen = screen;
  }
  update() {
    this.screen.renderer.ctx.clearRect(
      0,
      0,
      this.screen.renderer.domElement.width,
      this.screen.renderer.domElement.height,
    );
  }
}
