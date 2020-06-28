import BaseCamera from './BaseCamera';

export default class StaticCamera extends BaseCamera {
  update() {
    this.x = this.observedObject.x;
    this.y = this.observedObject.y;
    this.renderer.ctx.restore();
    this.renderer.ctx.clearRect(
      0,
      0,
      this.renderer.domElement.width,
      this.renderer.domElement.height,
    );
    this.renderer.ctx.save();
    this.renderer.ctx.translate(
      this.renderer.domElement.width / 2,
      this.renderer.domElement.height / 2,
    );
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
