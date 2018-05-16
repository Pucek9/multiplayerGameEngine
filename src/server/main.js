import express from 'express';
import http from 'http';
import io from 'socket.io'
import Player from '../objects/Player'
import Bullet from "../objects/Bullet";

const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);

const players = [];
let bullets = [];

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
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

function updateBullets() {
    bullets.forEach(bullet => bullet.update());
    bullets = bullets.filter(bullet => bullet.length > -500);
}

function detectCircularCollision(o1, o2) {
    let dx = o1.x - o2.x;
    let dy = o1.y - o2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < o1.height + o2.size
}

function detectRectangleCollision(player, bullet) {
    return bullet.x - 1 < player.x + player.width / 2 &&
        bullet.x + player.width / 2 + 1 > player.x &&
        bullet.y - 1 < player.y + player.height / 2 &&
        bullet.y + player.height / 2 + 1 > player.y;
}

function detectPlayerCollision(o1, o2, cx, cy) {
    return o1.x - o1.width / 2 < -o2.x + o2.width / 2 + cx &&
        o1.x + o2.width / 2 + o1.width / 2 > -o2.x + cx &&
        o1.y - o1.height / 2 < -o2.y + o2.height / 2 + cy &&
        o1.y + o2.height / 2 + o1.height / 2 > -o2.y + cy;
}


function detectBulletsCollision() {
    bullets.forEach((bullet, i) => {
        players.forEach(player => {
            if (bullet.owner !== player.id && detectRectangleCollision(player, bullet)) {
                const enemy = players.find(enemy => enemy.id === bullet.owner);
                player.hitFromBullet(enemy);
                bullets.splice(i, 1)
            }
        })
    })

}

socketIo.on('connection', function (socket) {

    socket.emit('HelloPlayer', {socketId: socket.id});

    socket.on('CreatePlayer', function (player) {
        console.log('Added new player: ', player);
        Object.setPrototypeOf(player, Player.prototype);
        players.push(player);
        socketIo.emit('getPlayers', activePlayers());

        socket.on('keydown', function (key) {
            const player = getPlayer(socket.id);
            switch (key) {
                case 'w':
                case 'W':
                case 'ArrowUp':
                    player.goUp();
                    break;
                case 's':
                case 'S':
                case 'ArrowDown':
                    player.goDown();
                    break;
                case 'a':
                case 'A':
                case 'ArrowLeft':
                    player.goLeft();
                    break;
                case 'd':
                case 'D':
                case 'ArrowRight':
                    player.goRight();
                    break;
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

        socket.on('pushBullet', function (bullet) {
            Object.setPrototypeOf(bullet, Bullet.prototype);
            bullets.push(bullet);
            socketIo.emit('getBullets', getBullets());
        });

        socket.on('iteration', function () {
            updateBullets();
            detectBulletsCollision();
            socketIo.emit('getPlayers', activePlayers());
            socketIo.emit('getBullets', getBullets());
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