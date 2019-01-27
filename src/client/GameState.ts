import Player from "./models/Player";
import Camera from "./models/Camera";
import PlayerModel from "../shared/models/PlayerModel";
import Bullet from "./models/Bullet";
import BulletUpdate from "../shared/api/BulletUpdate";
import StaticRectangleObject from "./models/StaticRectangleObject";
import StaticCircularObject from "./models/StaticCircularObject";
import Light from "./models/Light";
import PlayerListComponent from "./menu/PlayersList";
import MouseCoordinates from "../shared/api/MouseCoordinates";
import Map from "./models/Map";
import Cursor from "./models/Cursor";

const mapJPG = require('./games/balls/images/test.jpg');
const cursorPNG = require('./games/balls/images/pointer.png');

export default class GameState {

    user;
    screen;
    currentPlayer;
    camera: Camera;
    light: Light;
    playersListComponent;
    players= [];
    playersListString = '';
    bullets;
    keys: Set<string> = new Set([]);
    staticObjects: any [];
    map: Map;
    cursor: Cursor;

    constructor(user, screen) {

        this.user = user;
        this.screen = screen;
        this.light = new Light(screen);
        this.playersListComponent = new PlayerListComponent();
        this.map = new Map(mapJPG);
        this.cursor = new Cursor(cursorPNG);
        this.bullets = [];

        this.map.init(this.screen);
        this.cursor.init(this.screen);
    }

    appendNewPlayer(newPlayer) {
        const player = new Player(newPlayer.id, newPlayer.name, newPlayer.color, newPlayer.x, newPlayer.y);
        player.init(this.screen);
        player.setAsEnemy();
        this.players.push(player);
        if (!this.currentPlayer) {
            this.currentPlayer = this.players.find(player => player.id === this.user.id);
            this.currentPlayer.setAsActive();

            this.camera = new Camera(this.currentPlayer);
            this.camera.init(this.screen);
            this.light.init(this.currentPlayer, this.cursor);
        }
    }

    appendPlayers(_players: PlayerModel[]) {
        _players
            .filter(_player => _player.active)
            .forEach(_player => {
                const existed = this.players.find(player => player.id === _player.id);
                if (!existed) {
                    const player = new Player(_player.id, _player.name, _player.color, _player.x, _player.y);
                    player.init(this.screen);
                    player.setAsEnemy();
                    this.players.push(player);
                }
            });
    }

    addKey(e: KeyboardEvent) {
        this.keys.add(normalizeKey(e.key));
    }

    deleteKey(e: KeyboardEvent) {
        this.keys.delete(normalizeKey(e.key));
    }

    wheel(e: WheelEvent) {
        if (e.deltaY > 0) {
            // screen.camera.rotation.x += 0.1;
            this.screen.camera.position.z += 10;
        } else {
            // screen.camera.rotation.x -= 0.1;
            this.screen.camera.position.z -= 10;
        }
    }

    appendNewBullet(newBullet: Bullet) {
        if (newBullet) {
            const bullet = new Bullet(
                newBullet.id,
                newBullet.size,
            );
            bullet.init(this.screen);
            this.bullets.push(bullet);
        }
    }

    updatePlayersState(_players: PlayerModel[]) {
        this.players
            .forEach(player => {
                const _player = _players.find(_player => player.id === _player.id);
                if (this.currentPlayer && _player.id === this.currentPlayer.id) {
                    const diff = {
                        x: player.x - _player.x,
                        y: player.y - _player.y,
                    };
                    this.cursor.x -= diff.x;
                    this.cursor.y -= diff.y
                }
                if (_player) {
                    player.x = _player.x;
                    player.y = _player.y;
                    player.active = _player.active;
                    player.hp = _player.hp;
                    player.score = _player.score;
                    player.direction = _player.direction;
                }
            });
    }

    updateBulletsState(_bullets: BulletUpdate[]) {
        this.bullets
            .forEach(bullet => {
                const _bullet = _bullets.find(_bullet => bullet.id === _bullet.id);
                if (_bullet) {
                    bullet.x = _bullet.x;
                    bullet.y = _bullet.y;
                } else {
                    bullet.remove(this.screen);
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                }
            });
    }

    appendStaticObjects(_staticObjects: any[]) {
        this.staticObjects = _staticObjects;
        this.staticObjects.forEach(_staticObject => {
            if (_staticObject.type === 'rectangle') {
                Object.setPrototypeOf(_staticObject, StaticRectangleObject.prototype);
            } else {
                Object.setPrototypeOf(_staticObject, StaticCircularObject.prototype);
            }
        });
        this.staticObjects.forEach(object => object.init(this.screen))
    }

    removePlayer(id: string) {
        const disconnected = this.players.find(player => player.id === id);
        if (disconnected) {
            disconnected.remove(this.screen);
            this.players.splice(this.players.indexOf(disconnected), 1);
        }
    }

    getUpdatedMouseCoordinates(e: MouseEvent) {
        if (this.currentPlayer) {
            this.cursor.x = e.clientX + this.currentPlayer.x - window.innerWidth / 2;
            this.cursor.y = -e.clientY + this.currentPlayer.y + window.innerHeight / 2;
            return new MouseCoordinates(
                this.cursor.x,
                this.cursor.y,
                this.user.id
            );
        }
    }

    getMouseCoordinates() {
        return new MouseCoordinates(
            this.cursor.x,
            this.cursor.y,
            this.user.id
        );
    }

    tryRenderEverything() {
        if (this.currentPlayer) {
            [
                this.camera,
                this.map,
                ...this.staticObjects,
                ...this.bullets,
                ...this.players.filter(player => player.active),
                this.cursor,
                this.light,
            ].forEach(object => object.render());
        }
    }

}

function normalizeKey(key) {
    return (key.length !== 1) ? key : key.toUpperCase()
}
