import Player from "../client/models/Player";

const express = require('express');
const io = require('socket.io');
import * as http from 'http';

import NewPlayer from "../shared/api/NewPlayer";
import NewBullet from "../shared/api/NewBullet";
import GameState from './services/GameState'

const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);
const gameState = new GameState();
let player;

app.get('/', function (req, res) {
    res.send('<h1>Hello player! That\'s server api. Use port 8080 for connect client side!</h1>');
});

socketIo.on('connection', function (socket) {
    socket.emit('HelloPlayer', {socketId: socket.id});

    socket.on('CreatePlayer', function (newPlayer: NewPlayer) {
        console.log('Added new player: ', newPlayer);
        player = gameState.connectPlayer(socket.id, newPlayer);
        socketIo.emit('getPlayers', gameState.activePlayers());
        socketIo.emit('addPlayers', gameState.activePlayers());

        socket.on('keys', function (keys: Array<string>) {
            gameState.setKeys(socket.id,keys)
        });

        socket.on('activePlayer', function () {
            gameState.setPlayerActive(socket.id);
            socketIo.emit('addPlayer', player);
        });

        socket.on('pushBullet', function (newBullet: NewBullet) {
            gameState.addBullet(newBullet);
            socketIo.emit('getBullets', gameState.getBullets());
        });

        socket.on('iteration', function () {
            gameState.move(socket.id);
            gameState.updateBullets();
            gameState.detectBulletsCollision();
            socketIo.emit('getPlayers', gameState.activePlayers());
            socketIo.emit('getBullets', gameState.getBullets());
        });

        socketIo.emit('getStaticObjects', gameState.getStaticObjects());

        socket.on('disconnect', function () {
            const disconnected = gameState.getPlayer(socket.id);
            console.log('Disconnected player: ', disconnected);
            gameState.disconnectPlayer(disconnected);
            socketIo.emit('disconnectPlayer', socket.id);
        });

    });

});

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});