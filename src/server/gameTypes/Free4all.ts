import CollisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameMap from '../maps/GameMap';
import GameType from './GameType';

export default class Free4all implements GameType {

    public type = 'Free for all';

    constructor(public name: string,
                private map: GameMap,
                public players: Player[] = [],
                private bullets: Bullet[] = []) {
    }

    static rand(x) {
        return Math.floor((Math.random() * x) + 1);
    }

    generateId() {
        return Date.now() + Math.floor(Math.random() * 100);
    }

    getPlayer(id) {
        return this.players.find(player => player.id === id);
    }

    activePlayers() {
        return this.players.filter(player => player.active === true);
    }

    getPlayers() {
        return this.players;
    }

    isPlayerInThisGame(id: number) {
        return this.players.find(player => player.id === id);
    }

    getBullets() {
        return this.bullets.map(bullet => {
            return {id: bullet.id, x: bullet.x, y: bullet.y};
        });
    }

    getMapName() {
        return this.map.getMapName();
    }

    getStaticObjects() {
        return this.map.getStaticObjects();
    }

    updateBullets() {
        this.bullets.forEach((bullet, i) => {
            bullet.update();
            if (!bullet.isStillInAir()) {
                this.bullets.splice(i, 1);
            }
        });
    }

    detectBulletsCollision() {
        this.bullets.forEach((bullet, i) => {
            [...this.getStaticObjects(), ...this.players].forEach(object => {
                if (bullet.owner !== object) {
                    if (CollisionDetector.detectCollision(object, bullet)) {
                        object.hitFromBullet(bullet);
                        this.bullets.splice(i, 1);
                    }
                    if (object.aura) {
                        if (CollisionDetector.detectCollision(object.aura, bullet)) {
                            bullet.decreaseSpeed();
                        } else {
                            bullet.increaseSpeed();
                        }
                    }
                }
            });
        });
    }

    addBullet(mouseClick: MouseCoordinates) {
        const owner = this.getPlayer(mouseClick.owner);
        if (owner) {
            const bullet = new Bullet(
                this.generateId(),
                owner,
                owner.x + owner.size / 4,
                owner.y + owner.size / 4,
                mouseClick.targetX,
                mouseClick.targetY,
                2,
            );
            this.bullets.push(bullet);
            return {id: bullet.id, size: bullet.size};
        }
    }

    setPlayerActive(id: number) {
        this.getPlayer(id).active = true;
    }

    connectPlayer(id: number, newPlayer: NewPlayer) {
        const player = new Player(id, newPlayer.name, newPlayer.color, Free4all.rand(1000), Free4all.rand(1000), 20);
        this.players.push(player);
        return player;
    }

    disconnectPlayer(disconnected) {
        this.players.splice(this.players.indexOf(disconnected), 1);
    }

    setKeys(id, keys) {
        this.getPlayer(id).keys = new Set(keys);
    }

    move(id) {
        const player = this.getPlayer(id);
        if (player) {
            if (player.keys.has('W') || player.keys.has('ArrowUp')) {
                if (!this.detectPlayerCollision(player, {x: 0, y: player.speed})) {
                    player.goDown();
                }
            }
            if (player.keys.has('S') || player.keys.has('ArrowDown')) {
                if (!this.detectPlayerCollision(player, {x: 0, y: -player.speed})) {
                    player.goUp();
                }
            }
            if (player.keys.has('A') || player.keys.has('ArrowLeft')) {
                if (!this.detectPlayerCollision(player, {x: -player.speed, y: 0})) {
                    player.goLeft();
                }
            }
            if (player.keys.has('D') || player.keys.has('ArrowRight')) {
                if (!this.detectPlayerCollision(player, {x: player.speed, y: 0})) {
                    player.goRight();
                }
            }
            if (player.keys.has('Shift')) {
                player.getAura();
            } else {
                player.removeAura();
            }
        }
    }

    updatePlayerDirection(mouseCoordinates: MouseCoordinates) {
        const owner = this.getPlayer(mouseCoordinates.owner);
        if (owner) {
            const dx = mouseCoordinates.targetX - owner.x;
            const dy = mouseCoordinates.targetY - owner.y;
            owner.direction = Math.atan2(dy, dx) - 80;
        }
    }

    private detectPlayerCollision(player, direction: { x: number, y: number }) {
        return [...this.getStaticObjects(), ...this.players].some(object => {
            return player !== object && CollisionDetector.detectCollision(player, object, direction);
        });
    }
}
