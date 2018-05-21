import Player from "./Player";

export default class Bullet {

    public x: number;
    public y: number;
    public length: number;
    private trajectory: number;

    constructor(public fromX: number,
                public fromY: number,
                public targetX: number,
                public targetY: number,
                public owner: Player,
                public size: number = 1,
                public power: number = 10) {
        this.length = -10;
    }

    update() {
        this.length -= 10;
        this.trajectory = Math.sqrt(Math.pow((this.targetX - this.fromX), 2) + Math.pow((this.targetY - this.fromY), 2));
        this.x = this.targetX + ((this.trajectory + this.length) / this.trajectory) * (this.fromX - this.targetX);
        this.y = this.targetY + ((this.trajectory + this.length) / this.trajectory) * (this.fromY - this.targetY);
    }

}