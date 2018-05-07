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
            updateBullets()
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