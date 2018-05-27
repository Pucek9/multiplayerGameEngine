const express = require('express');
const io = require('socket.io');
import * as http from 'http';

import NewPlayer from "../common/api/NewPlayer";
import NewBullet from "../common/api/NewBullet";
import GameState from './services/GameState'

const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);
const gameState = new GameState();


socketIo.on('connection', function (socket) {

    app.get('/', function (req, res) {
        res.send('<h1>Hello player! That\'s server api. Use port 8080 for connect client side!</h1>');
    });

    socket.emit('HelloPlayer', {socketId: socket.id});

    socket.on('CreatePlayer', function (newPlayer: NewPlayer) {
        console.log('Added new player: ', newPlayer);
        gameState.connectPlayer(socket.id, newPlayer);
        socketIo.emit('getPlayers', gameState.activePlayers());

        socket.on('keydown', function (key) {
            const player = gameState.getPlayer(socket.id);
            switch (key) {
                case 'w':
                case 'W':
                case 'ArrowUp': {
                    if (!gameState.detectPlayerCollision(player, {x: 0, y: -player.speed}))
                        player.goUp();
                    break;
                }
                case 's':
                case 'S':
                case 'ArrowDown': {
                    if (!gameState.detectPlayerCollision(player, {x: 0, y: player.speed}))
                        player.goDown();
                    break;
                }
                case 'a':
                case 'A':
                case 'ArrowLeft': {
                    if (!gameState.detectPlayerCollision(player, {x: -player.speed, y: 0}))
                        player.goLeft();
                    break;
                }
                case 'd':
                case 'D':
                case 'ArrowRight': {
                    if (!gameState.detectPlayerCollision(player, {x: player.speed, y: 0}))
                        player.goRight();
                    break;
                }

                default:
                    break;
            }
            socketIo.emit('getPlayers', gameState.activePlayers());
        });

        socket.on('activePlayer', function () {
            gameState.setPlayerActive(socket.id);
            socketIo.emit('getPlayers', gameState.activePlayers());
        });

        socket.on('pushBullet', function (newBullet: NewBullet) {
            gameState.addBullet(newBullet);
            socketIo.emit('getBullets', gameState.getBullets());
        });

        socket.on('iteration', function () {
            gameState.updateBullets();
            gameState.detectBulletsCollision();
            socketIo.emit('getPlayers', gameState.activePlayers());
            socketIo.emit('getBullets', gameState.getBullets());
            socketIo.emit('getStaticObjects', gameState.getStaticObjects());

        });

        socket.on('disconnect', function () {
            const disconnected = gameState.getPlayer(socket.id);
            console.log('Disconnected player: ', disconnected);
            gameState.disconnectPlayer(disconnected);
            socketIo.emit('getPlayers', gameState.activePlayers());
        });

    });

});

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});