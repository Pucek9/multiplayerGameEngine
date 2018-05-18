export default class Bullet {

    x: number;
    y: number;
    fromX: number;
    fromY: number;
    targetX: number;
    targetY: number;
    owner: 'string';
    size: number;
    length: number;
    trajectory: number;

    constructor(fromX, fromY, targetX, targetY, owner) {
        this.fromX = fromX;
        this.fromY = fromY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.owner = owner;
        this.size = 1;
        this.length = -10;
    }

    update() {
        this.length -= 10;
        this.trajectory = Math.sqrt(Math.pow((this.targetX - this.fromX), 2) + Math.pow((this.targetY - this.fromY), 2));
        this.x = this.targetX + ((this.trajectory + this.length) / this.trajectory) * (this.fromX - this.targetX);
        this.y = this.targetY + ((this.trajectory + this.length) / this.trajectory) * (this.fromY - this.targetY);
    }

}