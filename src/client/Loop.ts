import MouseCoordinates from "../shared/api/MouseCoordinates";
import PlayerModel from "../shared/models/PlayerModel";
import * as constants from '../shared/constants.json';
import Player from "./models/Player";
import Bullet from "./models/Bullet";
import PlayerListComponent from "./menu/PlayersList";
import Camera from "./models/Camera";
import StaticCircularObject from "./models/StaticCircularObject";
import StaticRectangleObject from "./models/StaticRectangleObject";
import Cursor from "./models/Cursor";
import BulletUpdate from "../shared/api/BulletUpdate";
import Light from "./models/Light";

const API = (<any>constants).API;

const config = {
    menu: false,
    fps: 100,
};

const players = [];
let playersListString = '';
let bullets = [];
let keys: Set<string> = new Set([]);
let staticObjects: any [];

function normalizeKey(key) {
    return (key.length !== 1) ? key : key.toUpperCase()
}

function Loop(socket, user, screen, cursor: Cursor, map) {
    const that = this;
    let currentPlayer;
    let camera: Camera;
    let light: Light = new Light(screen);
    const playersListComponent = new PlayerListComponent();

    socket.on(API.ADD_NEW_PLAYER, function (newPlayer) {
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
    });

    socket.on(API.ADD_PLAYERS, function (_players: PlayerModel[]) {
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
    });

    socket.on(API.ADD_NEW_BULLET, function (newBullet: Bullet) {
        if (newBullet) {
            const bullet = new Bullet(
                newBullet.id,
                newBullet.size,
            );
            bullet.init(screen);
            bullets.push(bullet);
        }
    });

    socket.on(API.GET_PLAYERS_STATE, function (_players: PlayerModel[]) {
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
    });

    socket.on(API.GET_BULLETS, function (_bullets: BulletUpdate[]) {
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
    });

    socket.on(API.GET_STATIC_OBJECTS, function (_staticObjects: any[]) {
        staticObjects = _staticObjects;
        staticObjects.forEach(_staticObject => {
            if (_staticObject.type === 'rectangle') {
                Object.setPrototypeOf(_staticObject, StaticRectangleObject.prototype);
            } else {
                Object.setPrototypeOf(_staticObject, StaticCircularObject.prototype);
            }
        });
        staticObjects.forEach(object => object.init(screen))
    });

    socket.on(API.DISCONNECT_PLAYER, function (id: string) {
        const disconnected = players.find(player => player.id === id);
        if (disconnected) {
            disconnected.remove(screen);
            players.splice(players.indexOf(disconnected), 1);
        }
    });

    window.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (config.menu === false) {
            config.menu = true;
            socket.emit(API.ACTIVATE_PLAYER);
        } else {
            const mouseClick = new MouseCoordinates(
                cursor.x,
                cursor.y,
                user.id
            );
            socket.emit(API.MOUSE_CLICK, mouseClick);
        }
    });

    window.addEventListener("mousemove", function mouseMove(e) {
        // cursor.x = (e.clientX / window.innerWidth) * 2 - 1;
        // cursor.y = -(e.clientY / window.innerHeight) * 2 + 1;
        if (currentPlayer) {
            cursor.x = e.clientX + currentPlayer.x - window.innerWidth / 2;
            cursor.y = -e.clientY + currentPlayer.y + window.innerHeight / 2;
            const mouseCoordinates = new MouseCoordinates(
                cursor.x,
                cursor.y,
                user.id
            );
            socket.emit(API.UPDATE_DIRECTION, mouseCoordinates)
        }
        // if (e.pageX) {
        //     cursor.x = e.pageX;
        // }
        // else if (e.clientX) {
        //     cursor.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        // }
        // cursor.x = cursor.x - screen.canvas.offsetLeft;
        // if (e.pageY) {
        //     cursor.y = e.pageY;
        // }
        // else if (e.clientY) {
        //     cursor.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        // }
        // cursor.y = cursor.y - screen.canvas.offsetTop;
    }, false);

    window.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (!e.repeat) {
            keys.add(normalizeKey(e.key));
            socket.emit(API.UPDATE_KEYS, [...keys])
        }
    });

    window.addEventListener('keyup', function (e) {
        e.preventDefault();
        keys.delete(normalizeKey(e.key));
        socket.emit(API.UPDATE_KEYS, [...keys])
    });


    window.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (e.deltaY > 0) {
            //up
            // screen.camera.rotation.x += 0.1;
            screen.camera.position.z += 10;
        } else {
            // screen.camera.rotation.x -= 0.1;
            screen.camera.position.z -= 10;

        }
    });


    if (camera) {
        camera.init(screen);
    }
    map.init(screen);
    cursor.init(screen);
    // if (activePlayer) {
    //     cursor.x = activePlayer.x;
    //     cursor.y = activePlayer.y;
    // }

    screen.renderer.autoClear = true;
    screen.renderer.toneMappingExposure = Math.pow(0.68, 5.0); // to allow for very bright scenes.
    screen.renderer.shadowMap.enabled = true;

    this.run = function () {
        socket.emit(API.iteration);
        if (currentPlayer) {
            [
                camera,
                map,
                ...staticObjects,
                ...bullets,
                ...players.filter(player => player.active),
                cursor,
                light,
            ].forEach(object => object.render());
        }
        requestAnimationFrame(that.run);
        screen.renderer.render(screen.scene, screen.camera);

        //
        // cleaner.render();
        // socket.emit('iteration');
        // if (config.menu && activePlayer && map) {
        //     [map, ...bullets, ...staticObjects, ...players].forEach(object => object.render(activePlayer));
        // } else {
        //     menu.render();
        // }
        const playersList = players.map(player => ({name: player.name, score: player.score, color:player.color, hp: player.hp}));
        const _playersListString = JSON.stringify(playersList);
        if(_playersListString !== playersListString) {
            playersListComponent.render(playersList);
            playersListString = _playersListString;
        }
        // cursor.render();
        //
        // setTimeout(that.run, 1000 / config.fps);
    }
}

export default Loop;
