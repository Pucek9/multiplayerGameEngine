import GamesStore from "./services/GamesStore";

const API = require('../shared/constants.json').API;
const express = require('express');
const cors = require('cors');
const io = require('socket.io');
import * as http from 'http';

import NewPlayer from "../shared/api/NewPlayer";
import MouseCoordinates from "../shared/api/MouseCoordinates";
import NewGame from "../shared/api/NewGame";

const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = io.listen(httpServer);
const gamesStory = new GamesStore();
let player;

app.use(express.static('dist/client'));

app.route('/login/:login')
    .get(function (req, res) {
        res.send('Get a user' + req.params.login)
    })
    .post(function (req, res) {
        res.send('Add a user' + req.body.login)
    })
    .put(function (req, res) {
        res.send('Update the user' + req.body.login)
    });

app.use(cors())

socketIo.on('connection', function (socket) {

    console.log('connection:', socket.id);
    setTimeout(() => {
        socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
        socket.emit(API.WELCOME_NEW_PLAYER, {socketId: socket.id});
    }, 1000);

    socket.on(API.CREATE_GAME, function (newGame: NewGame) {
        gamesStory.createGame(newGame.name, newGame.type, newGame.map);
        socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
    });

    socket.on(API.CREATE_PLAYER, function (newPlayer: NewPlayer) {
            console.log('Added new player: ', newPlayer);
            const gameState = gamesStory.getGame(newPlayer.gameName);
            if (gameState) {
                socket.join(newPlayer.gameName);
                player = gameState.connectPlayer(socket.id, newPlayer);
                socketIo.to(newPlayer.gameName).emit(API.GET_PLAYERS_STATE, gameState.activePlayers());
                socketIo.to(newPlayer.gameName).emit(API.ADD_PLAYERS, gameState.activePlayers());
                socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());

                socket.on(API.UPDATE_KEYS, function (keys: Array<string>) {
                    gameState.setKeys(socket.id, keys)
                });

                socket.on(API.ACTIVATE_PLAYER, function () {
                        console.log('Player activated: ', socket.id);
                        gameState.setPlayerActive(socket.id);
                        socketIo.to(newPlayer.gameName).emit(API.ADD_NEW_PLAYER, player);

                        setInterval(() => {
                            gameState.move(socket.id);
                            gameState.updateBullets();
                            gameState.detectBulletsCollision();
                            socketIo.to(newPlayer.gameName).emit(API.GET_PLAYERS_STATE, gameState.activePlayers());
                            socketIo.to(newPlayer.gameName).emit(API.GET_BULLETS, gameState.getBullets());
                        }, 1000 / 60);
                    }
                );

                socket.on(API.MOUSE_CLICK, function (mouseClick: MouseCoordinates) {
                    const bullet = gameState.addBullet(mouseClick);
                    socketIo.to(newPlayer.gameName).emit(API.ADD_NEW_BULLET, bullet);
                });

                socket.on(API.UPDATE_DIRECTION, function (mouseCoordinates: MouseCoordinates) {
                    gameState.updatePlayerDirection(mouseCoordinates)
                });

                socket.on('disconnect', function () {
                    const disconnected = gameState.getPlayer(socket.id);
                    console.log('Disconnected player: ', disconnected);
                    gameState.disconnectPlayer(disconnected);
                    socketIo.to(newPlayer.gameName).emit(API.DISCONNECT_PLAYER, socket.id);
                    socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
                });

                socketIo.to(newPlayer.gameName).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
            }
        }
    );

});

httpServer.listen(parseInt(port), function () {
    console.log(`listening on *:${port}`);
});