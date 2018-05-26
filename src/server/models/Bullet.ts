import BulletModel from "../../common/models/BulletModel";

export default class Bullet extends BulletModel {

    private length: number;
    private trajectory: number;

    constructor(fromX, fromY, targetX, targetY, owner, size?, power?, range?) {
        super(fromX, fromY, targetX, targetY, owner, size, power, range);
        this.length = 10;
        this.range = 500;
    }

    isStillInAir() {
        return this.length < this.range;
    }

    update() {
        this.length += 10;
        this.trajectory = Math.sqrt(Math.pow((this.targetX - this.fromX), 2) + Math.pow((this.targetY - this.fromY), 2));
        this.x = this.targetX + ((this.trajectory - this.length) / this.trajectory) * (this.fromX - this.targetX);
        this.y = this.targetY + ((this.trajectory - this.length) / this.trajectory) * (this.fromY - this.targetY);
    }

}