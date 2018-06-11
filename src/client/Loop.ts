import NewBullet from "../shared/api/NewBullet";
import PlayerModel from "../shared/models/PlayerModel";
import Player from "./models/Player";
import Bullet from "./models/Bullet";
import PlayerList from "./models/PlayersList";
import Camera from "./models/Camera";
import StaticCircularObject from "./models/StaticCircularObject";
import StaticRectangleObject from "./models/StaticRectangleObject";

const config = {
    menu: false,
    fps: 100,
};

const players = [];
const bullets = [];
let keys: Set<string> = new Set([]);
let staticObjects: any [];

function normalizeKey(key) {
    return (key.length !== 1) ? key : key.toUpperCase()
}

function Loop(socket, user, screen, cursor, menu, map) {
    const that = this;
    cursor.init(screen);
    let activePlayer;
    let camera: Camera
    const playersList = new PlayerList(screen);

    socket.on('addPlayer', function (newPlayer) {
        const player = new Player(newPlayer.id, newPlayer.name, newPlayer.color, newPlayer.x, newPlayer.y);
        player.init(screen);
        players.push(player);
        activePlayer = players.find(player => player.id === user.id);
        camera = new Camera(activePlayer);
        camera.init(screen);
    });

    socket.on('addPlayers', function (_players: PlayerModel[]) {
        _players
            .filter(_player => _player.active)
            .forEach(_player => {
                const player = new Player(_player.id, _player.name, _player.color, _player.x, _player.y);
                player.init(screen);
                players.push(player);
            });
    });

    socket.on('getPlayers', function (_players: PlayerModel[]) {

        players
            .forEach(player => {
                const _player = _players.find(_player => player.id === _player.id);
                if (_player) {
                    player.x = _player.x;
                    player.y = _player.y;
                    player.active = _player.active;
                }
            });
        activePlayer = players.find(player => player.id === user.id);
    });

    socket.on('getBullets', function (_bullets: Bullet[]) {
        // bullets = _bullets;
        // bullets.forEach(bullet => {
        //     Object.setPrototypeOf(bullet, Bullet.prototype);
        //     bullet.screen = screen;
        // })
    });

    socket.on('getStaticObjects', function (_staticObjects: any[]) {
        console.log('getStaticObjects')
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

    socket.on('disconnectPlayer', function (id: string) {
        const disconnected = players.find(player => player.id === id);
        disconnected.remove(screen);
        players.splice(players.indexOf(disconnected), 1);
    });

// screen.canvas.addEventListener('mousedown', function (e) {
    window.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (config.menu === false) {
            config.menu = true;
            socket.emit('activePlayer');
        } else {
            //         const newBullet = new NewBullet(
            //             activePlayer.x + cursor.x - screen.canvas.width / 2,
            //             activePlayer.y + cursor.y - screen.canvas.height / 2,
            //             user.id
            //         );
            //         socket.emit('pushBullet', newBullet);
            console.log(cursor.x,cursor.y)

        }
        //
    });
//
// screen.canvas.addEventListener('mouseup', function (e) {
//     e.preventDefault();
// });
//
window.addEventListener("mousemove", function mouseMove(e) {
    cursor.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    cursor.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
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
            socket.emit('keys', [...keys])
        }
    });

    window.addEventListener('keyup', function (e) {
        e.preventDefault();
        keys.delete(normalizeKey(e.key));
        socket.emit('keys', [...keys])
    });

// window.addEventListener("wheel", function (e) {
//     e.preventDefault();
// - 100 up
// 100 down
// if (e.deltaY > 0) {
//     //up
// } else {
//
// }
// console.log(e)
// });
    if (camera) {
        camera.init(screen);
    }
    map.init(screen);

    socket.emit('iteration');
    screen.renderer.autoClear = true;


    this.run = function () {
        socket.emit('iteration');
        if (activePlayer) {
            [
                camera,
                map,
                ...staticObjects,
                ...players.filter(player => player.active),
                cursor
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