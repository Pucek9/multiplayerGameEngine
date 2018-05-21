import Bullet from "./Bullet";

export default class Player {

    public width: number;
    public height: number;
    public active: boolean;
    public alive: boolean;

    constructor(public id: number,
                public name: string,
                public color: string,
                public x: number,
                public y: number,
                size: number,
                public speed: number = 5,
                public score: number = 0,
                public hp: number = 100,
    ) {
        this.width = size;
        this.height = size;
        this.active = false;
        this.alive = true;
    }

    isAlive() {
        return this.alive;
    }

    die() {
        this.alive = false;
    }

    hitFromBullet(bullet: Bullet) {
        if (this.isAlive()) {
            this.hp = this.hp - bullet.power;
            if (this.hp <= 0) {
                if (bullet.owner) {
                    bullet.owner.score = bullet.owner.score + 100;
                }
                this.die();
            }
        }
    }

    goLeft() {
        this.x = this.x - this.speed;
    }

    goRight() {
        this.x = this.x + this.speed;
    }

    goDown() {
        this.y = this.y + this.speed;
    }

    goUp() {
        this.y = this.y - this.speed;
    }
}