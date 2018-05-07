export default class Bullet {

    constructor(fromX, fromY, targetX, targetY, owner) {
        this.fromX = fromX;
        this.fromY = fromY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.owner = owner;
        this.length = -10;
    }

    update() {
        this.length -= 10;
        this.trajectory = Math.sqrt(Math.pow((this.targetX - this.fromX), 2) + Math.pow((this.targetY - this.fromY), 2));
        this.actualX = this.targetX + ((this.trajectory + this.length) / this.trajectory) * (this.fromX - this.targetX);
        this.actualY = this.targetY + ((this.trajectory + this.length) / this.trajectory) * (this.fromY - this.targetY);
    }

}