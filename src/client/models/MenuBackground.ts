import IRenderable from '../interfaces/IRenderable';

export default class MenuBackground implements IRenderable {
  public background: HTMLElement;

  constructor(id: string, src: string) {
    // @ts-ignore
    this.background = document.getElementById('menu');
    this.background.style.backgroundImage = `url(${src})`;
    // this.img.src = src;
  }

  render() {
    // this.screen.ctx.drawImage(
    //     this.img,
    //     0,
    //     0
    // )
  }
}
