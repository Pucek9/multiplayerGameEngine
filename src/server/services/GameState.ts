import CollisionDetector from "./CollisionDetector";
import Bullet from "../models/Bullet";
import StaticRectangleObject from "../models/StaticRectangleObject";
import Player from "../models/Player";
import StaticCircularObject from "../models/StaticCircularObject";
import NewPlayer from "../../shared/api/NewPlayer";
import NewBullet from "../../shared/api/NewBullet";

export default class GameState {

    constructor(private staticObjects: any[] = [],
                private players: Player[] = [],
                private bullets: Bullet[] = []) {

        this.staticObjects.push(
            new StaticCircularObject(100, 200, 100, 'red'),
            new StaticCircularObject(1000, 200, 100, 'blue'),
            new StaticRectangleObject(500, 300, 500, 100, 'green', 45),
            new StaticRectangleObject(2300, 30, 100, 300, 'yellow'),
        );
    }

    getPlayer(id) {
        return this.players.find(player => player.id === id);
    }

    activePlayers() {
        return this.players.filter(player => player.active === true)
    }

    getPlayers() {
        return this.players;
    }

    getBullets() {
        return this.bullets;
    }

    getStaticObjects() {
        return this.staticObjects;
    }

    updateBullets() {
        this.bullets.forEach((bullet, i) => {
            bullet.update();
            if (!bullet.isStillInAir()) {
                this.bullets.splice(i, 1)
            }
        });
    }

    detectPlayerCollision(player, direction: { x: number, y: number }) {
        return this.staticObjects.concat(this.players).some(object => {
            return player !== object && CollisionDetector.detectCollision(player, object, direction);
        });
    }

    detectBulletsCollision() {
        this.bullets.forEach((bullet, i) => {
            this.staticObjects.concat(this.players).forEach(object => {
                if (bullet.owner !== object && CollisionDetector.detectCollision(object, bullet)) {
                    object.hitFromBullet(bullet);
                    this.bullets.splice(i, 1)
                }
            });
        });
    }

    addBullet(newBullet: NewBullet) {
        const owner = this.getPlayer(newBullet.owner);
        const bullet = new Bullet(
            owner.x + owner.size / 4,
            owner.y + owner.size / 4,
            newBullet.targetX,
            newBullet.targetY,
            owner
        );
        this.bullets.push(bullet);
    }

    setPlayerActive(id: number) {
        const player = this.getPlayer(id);
        player.active = true;
    }

    connectPlayer(id: number, newPlayer: NewPlayer) {
        const player = new Player(id, newPlayer.name, newPlayer.color, GameState.rand(1000), GameState.rand(1000), 20);
        this.players.push(player);
    }

    disconnectPlayer(disconnected) {
        this.players.splice(this.players.indexOf(disconnected), 1);
    }

    static rand(x) {
        return Math.floor((Math.random() * x) + 1);
    }
}