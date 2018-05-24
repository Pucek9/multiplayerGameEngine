// import express from 'express';
import NewPlayer from "../api/NewPlayer";

const express = require('express');
import * as http from 'http';

const io = require('socket.io');
import Player from './models/Player';
import Bullet from "./models/Bullet";
import CollisionDetector from './CollisionDetector'
import NewBullet from "../api/NewBullet";

const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);

const players: Player[] = [];
let bullets: Bullet[] = [];

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

function detectBulletsCollision() {
    bullets.forEach((bullet, i) => {
        players.forEach(player => {
            if (bullet.owner !== player && CollisionDetector.detectRectangleCollision(player, bullet)) {
                player.hitFromBullet(bullet);
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
        // Object.setPrototypeOf(player, Player.prototype);
        const player = new Player(socket.id, newPlayer.name, newPlayer.color, rand(1000), rand(1000), 20);
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

        socket.on('pushBullet', function (newBullet: NewBullet) {
            const bullet = new Bullet(newBullet.fromX,
                newBullet.fromY,
                newBullet.targetX,
                newBullet.targetY,
                getPlayer(newBullet.owner));
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