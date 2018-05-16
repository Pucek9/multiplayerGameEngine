export default class Player {

    constructor(id, name, color, x, y, size) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = size;
        this.height = size;
        this.name = name;
        this.color = color;
        this.active = false;
        this.alived = true;
        this.score = 0;
        this.speed = 5;
        this.hp = 100;
    }

    hitFromBullet(enemy) {
        if (this.alived) {
            this.hp = this.hp - 10;
            if (this.hp <= 0) {
                if (enemy) {
                    enemy.score = enemy.score + 100;
                }
                this.alived = false;
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