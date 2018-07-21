import NewBullet from "../shared/api/NewBullet";
import PlayerModel from "../shared/models/PlayerModel";
import * as constants from '../shared/constants.json';
import Player from "./models/Player";
import Bullet from "./models/Bullet";
import PlayerList from "./models/PlayersList";
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
let bullets = [];
let keys: Set<string> = new Set([]);
let staticObjects: any [];

function normalizeKey(key) {
    return (key.length !== 1) ? key : key.toUpperCase()
}

function Loop(socket, user, screen, cursor: Cursor, menu, map) {
    const that = this;
    let activePlayer;
    let camera: Camera;
    let light = new Light(screen);
    const playersList = new PlayerList(screen);

    socket.on(API.addPlayer, function (newPlayer) {
        const player = new Player(newPlayer.id, newPlayer.name, newPlayer.color, newPlayer.x, newPlayer.y);
        player.init(screen);
        player.setAsEnemy();
        players.push(player);
        if (!activePlayer) {
            activePlayer = players.find(player => player.id === user.id);
            activePlayer.setAsActive();

            camera = new Camera(activePlayer);
            camera.init(screen);
            light.init(activePlayer, cursor);
        }
    });

    socket.on(API.addPlayers, function (_players: PlayerModel[]) {
        _players
            .filter(_player => _player.active)
            .forEach(_player => {
                const existed = players.find(player => player.id === _player.id);
                if(!existed) {
                    const player = new Player(_player.id, _player.name, _player.color, _player.x, _player.y);
                    player.init(screen);
                    player.setAsEnemy();
                    players.push(player);
                }
            });
    });

    socket.on(API.addBullet, function (newBullet: Bullet) {
        if (newBullet) {
            const bullet = new Bullet(
                newBullet.id,
                newBullet.size,
            );
            bullet.init(screen);
            bullets.push(bullet);
        }
    });

    socket.on(API.getPlayers, function (_players: PlayerModel[]) {
        players
            .forEach(player => {
                const _player = _players.find(_player => player.id === _player.id);
                if (_player) {
                    player.x = _player.x;
                    player.y = _player.y;
                    player.active = _player.active;
                    player.hp = _player.hp;
                    player.score = _player.score;
                }
            });
    });

    socket.on(API.getBullets, function (_bullets: BulletUpdate[]) {
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

    socket.on(API.getStaticObjects, function (_staticObjects: any[]) {
        console.log('getStaticObjects');
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

    socket.on(API.disconnectPlayer, function (id: string) {
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
            console.log('aktywujemy go', API.activePlayer)
            socket.emit(API.activePlayer);
        } else {
            const newBullet = new NewBullet(
                cursor.x,
                cursor.y,
                user.id
            );
            socket.emit(API.pushBullet, newBullet);
        }
    });

    window.addEventListener("mousemove", function mouseMove(e) {
        // cursor.x = (e.clientX / window.innerWidth) * 2 - 1;
        // cursor.y = -(e.clientY / window.innerHeight) * 2 + 1;
        if (activePlayer) {
            cursor.x = e.clientX + activePlayer.x - window.innerWidth / 2;
            cursor.y = -e.clientY + activePlayer.y + window.innerHeight / 2
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
            socket.emit(API.keys, [...keys])
        }
    });

    window.addEventListener('keyup', function (e) {
        e.preventDefault();
        keys.delete(normalizeKey(e.key));
        socket.emit(API.keys, [...keys])
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
        if (activePlayer) {
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
        // playersList.render(players);
        // cursor.render();
        //
        // setTimeout(that.run, 1000 / config.fps);
    }
}

export default Loop;