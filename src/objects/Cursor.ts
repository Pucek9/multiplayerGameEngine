export default class Cursor {
    x: number;
    y: number;
    img: HTMLImageElement;

    constructor(src : string) {
        this.x = 0;
        this.y = 0;
        this.img = new Image();
        this.img.src = src;
    };
}