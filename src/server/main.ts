const API = require('../shared/constants.json').API;
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

    console.log('connection:',API.helloPlayer, socket.id);
    setTimeout(() => {
        socket.emit(API.helloPlayer, {socketId: socket.id});
    },1000);

    socket.on(API.createPlayer, function (newPlayer: NewPlayer) {
        console.log('Added new player: ', newPlayer);
        player = gameState.connectPlayer(socket.id, newPlayer);
        socketIo.emit(API.getPlayers, gameState.activePlayers());
        socketIo.emit(API.addPlayers, gameState.activePlayers());

        socket.on(API.keys, function (keys: Array<string>) {
            gameState.setKeys(socket.id,keys)
        });

        socket.on(API.activePlayer, function () {
            console.log('Player activated: ', socket.id);
            gameState.setPlayerActive(socket.id);
            socketIo.emit(API.addPlayer, player);

            setInterval(() => {
                gameState.move(socket.id);
                gameState.updateBullets();
                gameState.detectBulletsCollision();
                socketIo.emit(API.getPlayers, gameState.activePlayers());
                socketIo.emit(API.getBullets, gameState.getBullets());
            },1000 / 60);
        });

        socket.on(API.pushBullet, function (newBullet: NewBullet) {
            const bullet = gameState.addBullet(newBullet);
            socketIo.emit(API.addBullet, bullet);
        });

        // socket.on('iteration', function () {
        //     gameState.move(socket.id);
        //     gameState.updateBullets();
        //     gameState.detectBulletsCollision();
        //     socketIo.emit('getPlayers', gameState.activePlayers());
        //     socketIo.emit('getBullets', gameState.getBullets());
        // });

        socketIo.emit(API.getStaticObjects, gameState.getStaticObjects());

        socket.on('disconnect', function () {
            const disconnected = gameState.getPlayer(socket.id);
            console.log('Disconnected player: ', disconnected);
            gameState.disconnectPlayer(disconnected);
            socketIo.emit(API.disconnectPlayer, socket.id);
        });

    });

});

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});