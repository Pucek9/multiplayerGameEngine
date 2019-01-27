import Player from "./models/Player";
import Camera from "./models/Camera";
import PlayerModel from "../shared/models/PlayerModel";
import Bullet from "./models/Bullet";
import BulletUpdate from "../shared/api/BulletUpdate";
import StaticRectangleObject from "./models/StaticRectangleObject";
import StaticCircularObject from "./models/StaticCircularObject";

export default class GameState {

    constructor() {}

    appendNewPlayer (newPlayer) {
        const player = new Player(newPlayer.id, newPlayer.name, newPlayer.color, newPlayer.x, newPlayer.y);
        player.init(screen);
        player.setAsEnemy();
        players.push(player);
        if (!currentPlayer) {
            currentPlayer = players.find(player => player.id === user.id);
            currentPlayer.setAsActive();

            camera = new Camera(currentPlayer);
            camera.init(screen);
            light.init(currentPlayer, cursor);
        }
    }

    appendPlayers (_players: PlayerModel[]) {
        _players
            .filter(_player => _player.active)
            .forEach(_player => {
                const existed = players.find(player => player.id === _player.id);
                if (!existed) {
                    const player = new Player(_player.id, _player.name, _player.color, _player.x, _player.y);
                    player.init(screen);
                    player.setAsEnemy();
                    players.push(player);
                }
            });
    }

    appendNewBullet (newBullet: Bullet) {
        if (newBullet) {
            const bullet = new Bullet(
                newBullet.id,
                newBullet.size,
            );
            bullet.init(screen);
            bullets.push(bullet);
        }
    }

    updatePlayersState (_players: PlayerModel[]) {
        players
            .forEach(player => {
                const _player = _players.find(_player => player.id === _player.id);
                if (currentPlayer && _player.id === currentPlayer.id) {
                    const diff = {
                        x: player.x - _player.x,
                        y: player.y - _player.y,
                    };
                    cursor.x -= diff.x;
                    cursor.y -= diff.y
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

    updateBulletsState (_bullets: BulletUpdate[]) {
        bullets
            .forEach(bullet => {
                const _bullet = _bullets.find(_bullet => bullet.id === _bullet.id);
                if (_bullet) {
                    bullet.x = _bullet.x;
                    bullet.y = _bullet.y;
                } else {
                    bullet.remove(screen);
                    bullets.splice(bullets.indexOf(bullet), 1);
                }
            });
    }

    appendStaticObjects (_staticObjects: any[]) {
        staticObjects = _staticObjects;
        staticObjects.forEach(_staticObject => {
            if (_staticObject.type === 'rectangle') {
                Object.setPrototypeOf(_staticObject, StaticRectangleObject.prototype);
            } else {
                Object.setPrototypeOf(_staticObject, StaticCircularObject.prototype);
            }
        });
        staticObjects.forEach(object => object.init(screen))
    }

    removePlayer (id: string) {
        const disconnected = players.find(player => player.id === id);
        if (disconnected) {
            disconnected.remove(screen);
            players.splice(players.indexOf(disconnected), 1);
        }
    }



}
