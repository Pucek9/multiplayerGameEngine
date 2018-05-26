import Bullet from "./Bullet";
import PlayerModel from "../../common/models/PlayerModel";

export default class Player extends PlayerModel {

    isAlive() {
        return this.alive;
    }

    die() {
        this.alive = false;
    }

    addScore(score: number) {
        this.score = this.score + score;
    }

    hitFromBullet(bullet: Bullet) {
        if (this.isAlive()) {
            this.hp = this.hp - bullet.power;
            if (this.hp <= 0) {
                if (bullet.owner) {
                    bullet.owner.addScore(100);
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