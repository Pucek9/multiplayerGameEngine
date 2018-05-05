export default class Player {

    constructor(id, name, color, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;
        this.active = false;
        this.speed = 3;
    }

    copy(obj) {
        return obj && Object.assign(this, obj);
    }

    goLeft() {
        this.x = this.x-this.speed;
    }

    goRight() {
        this.x = this.x+this.speed;
    }

    goDown() {
        this.y = this.y+this.speed;
    }

    goUp() {
        this.y = this.y-this.speed;
    }
}