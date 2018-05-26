const express = require('express');
const io = require('socket.io');
import * as http from 'http';

import CollisionDetector from './services/CollisionDetector'
import NewPlayer from "../common/api/NewPlayer";
import NewBullet from "../common/api/NewBullet";
import Player from './models/Player';
import Bullet from "./models/Bullet";
import StaticCircularObject from "./models/StaticCircularObject";
import StaticRectangleObject from "./models/StaticRectangleObject";

const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);

const staticObjects: any[] = [];
const players: Player[] = [];
let bullets: Bullet[] = [];

staticObjects.push(
    new StaticCircularObject(100, 200, 100, 'red'),
    new StaticCircularObject(1000, 200, 100, 'blue'),
    new StaticRectangleObject(500, 300, 500, 100, 'green'),
    new StaticRectangleObject(2300, 30, 100, 300, 'yellow'),
);

app.get('/', function (req, res) {
    res.send('<h1>Hello player! Thats server api. Use port 8080 for connect client side!</h1>');
});

function getPlayer(id) {
    return players.find(player => player.id === id);
}

function activePlayers() {
    return players.filter(player => player.active === true)
}

function getPlayers() {
    return players;
}

function getBullets() {
    return bullets;
}

function getStaticObjects() {
    return staticObjects;
}

function updateBullets() {
    bullets.forEach(bullet => bullet.update());
    bullets = bullets.filter(bullet => bullet.isStillInAir());
}

function detectPlayerCollision(player, direction: { x: number, y: number }) {
    return staticObjects.concat(players).some(object => {
        return player !== object && CollisionDetector.detectCollision(player, object, direction);
    });
}

function detectBulletsCollision() {
    bullets.forEach((bullet, i) => {
        staticObjects.concat(players).forEach(object => {
            if (bullet.owner !== object && CollisionDetector.detectCollision(object, bullet)) {
                object.hitFromBullet(bullet);
                bullets.splice(i, 1)
            }
        })
    })
}


function rand(x) {
    return Math.floor((Math.random() * x) + 1);
}

socketIo.on('connection', function (socket) {

    socket.emit('HelloPlayer', {socketId: socket.id});

    socket.on('CreatePlayer', function (newPlayer: NewPlayer) {
        console.log('Added new player: ', newPlayer);
        const player = new Player(socket.id, newPlayer.name, newPlayer.color, rand(1000), rand(1000), 20);
        players.push(player);
        socketIo.emit('getPlayers', activePlayers());

        socket.on('keydown', function (key) {
            const player = getPlayer(socket.id);
            switch (key) {
                case 'w':
                case 'W':
                case 'ArrowUp': {
                    if (!detectPlayerCollision(player, {x: 0, y: -player.speed}))
                        player.goUp();
                    break;
                }
                case 's':
                case 'S':
                case 'ArrowDown': {
                    if (!detectPlayerCollision(player, {x: 0, y: player.speed}))
                        player.goDown();
                    break;
                }
                case 'a':
                case 'A':
                case 'ArrowLeft': {
                    if (!detectPlayerCollision(player, {x: -player.speed, y: 0}))
                        player.goLeft();
                    break;
                }
                case 'd':
                case 'D':
                case 'ArrowRight': {
                    if (!detectPlayerCollision(player, {x: player.speed, y: 0}))
                        player.goRight();
                    break;
                }

                default:
                    break;
            }
            socketIo.emit('getPlayers', activePlayers());
        });

        socket.on('activePlayer', function () {
            const player = getPlayer(socket.id);
            player.active = true;
            socketIo.emit('getPlayers', activePlayers());
        });

        socket.on('pushBullet', function (newBullet: NewBullet) {
            let owner = getPlayer(newBullet.owner);
            const bullet = new Bullet(
                owner.x + owner.size / 4,
                owner.y + owner.size / 4,
                newBullet.targetX,
                newBullet.targetY,
                owner
            );
            bullets.push(bullet);
            socketIo.emit('getBullets', getBullets());
        });

        socket.on('iteration', function () {
            updateBullets();
            detectBulletsCollision();
            socketIo.emit('getPlayers', activePlayers());
            socketIo.emit('getBullets', getBullets());
            socketIo.emit('getStaticObjects', getStaticObjects());

        });

        socket.on('disconnect', function () {
            const disconnected = getPlayer(socket.id);
            console.log('Disconnected player: ', disconnected);
            players.splice(players.indexOf(disconnected), 1);
            socketIo.emit('getPlayers', activePlayers());
        });

    });

});

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});