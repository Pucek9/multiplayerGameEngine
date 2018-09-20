const API = require('../shared/constants.json').API;
const express = require('express');
const io = require('socket.io');
import * as http from 'http';

import NewPlayer from "../shared/api/NewPlayer";
import MouseCoordinates from "../shared/api/MouseCoordinates";
import GameState from './services/GameState'

const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);
const gameState = new GameState();
let player;
const games = [];

app.use(express.static('dist/client'));

socketIo.on('connection', function (socket) {

    console.log('connection:', socket.id);
    setTimeout(() => {
        socketIo.emit(API.GET_GAMES_LIST, games);
        socket.emit(API.WELCOME_NEW_PLAYER, {socketId: socket.id});
    },1000);

    socket.on(API.CREATE_GAME, function (game) {
        socket.join(game.name);
        games.push(game)
        socketIo.emit(API.GET_GAMES_LIST, games);
    });

    socket.on(API.CREATE_PLAYER, function (newPlayer: NewPlayer) {
        console.log('Added new player: ', newPlayer);
        player = gameState.connectPlayer(socket.id, newPlayer);
        socketIo.emit(API.GET_PLAYERS_STATE, gameState.activePlayers());
        socketIo.emit(API.ADD_PLAYERS, gameState.activePlayers());

        socket.on(API.UPDATE_KEYS, function (keys: Array<string>) {
            gameState.setKeys(socket.id,keys)
        });

        socket.on(API.ACTIVATE_PLAYER, function () {
            console.log('Player activated: ', socket.id);
            gameState.setPlayerActive(socket.id);
            socketIo.emit(API.ADD_NEW_PLAYER, player);

            setInterval(() => {
                gameState.move(socket.id);
                gameState.updateBullets();
                gameState.detectBulletsCollision();
                socketIo.emit(API.GET_PLAYERS_STATE, gameState.activePlayers());
                socketIo.emit(API.GET_BULLETS, gameState.getBullets());
            },1000 / 60);
        });

        socket.on(API.MOUSE_CLICK, function (mouseClick: MouseCoordinates) {
            const bullet = gameState.addBullet(mouseClick);
            socketIo.emit(API.ADD_NEW_BULLET, bullet);
        });

        socket.on(API.UPDATE_DIRECTION, function (mouseCoordinates: MouseCoordinates) {
            gameState.updatePlayerDirection(mouseCoordinates)
        });

        // socket.on('iteration', function () {
        //     gameState.move(socket.id);
        //     gameState.updateBullets();
        //     gameState.detectBulletsCollision();
        //     socketIo.emit('getPlayers', gameState.activePlayers());
        //     socketIo.emit('getBullets', gameState.getBullets());
        // });

        socketIo.emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());

        socket.on('disconnect', function () {
            const disconnected = gameState.getPlayer(socket.id);
            console.log('Disconnected player: ', disconnected);
            gameState.disconnectPlayer(disconnected);
            socketIo.emit(API.DISCONNECT_PLAYER, socket.id);
        });

    });

});

httpServer.listen(parseInt(port), function () {
    console.log(`listening on *:${port}`);
});