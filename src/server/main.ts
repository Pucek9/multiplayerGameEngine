import * as express from 'express';
import * as http from 'http';
import { listen, Socket } from 'socket.io';

import GamesStore from './services/GamesStore';
import NewPlayer from '../shared/apiModels/NewPlayer';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import Player from './models/Player';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = listen(httpServer);
const gamesStory = new GamesStore();
let player: Player;

app.use(express.static('dist/client'));

socketIo.on('connection', function(socket: Socket) {
  console.log('connection:', socket.id);
  setTimeout(() => {
    socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
    socket.emit(API.WELCOME_NEW_PLAYER, socket.id);
  }, TIMEOUT);

  socket.on(API.CREATE_GAME, function(newGame: NewGame) {
    gamesStory.createGame(newGame.name, newGame.type, newGame.map);
    socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
  });

  socket.on(API.CREATE_PLAYER, function(newPlayer: NewPlayer) {
    console.log('Added new player: ', newPlayer);
    const gameState = gamesStory.getGame(newPlayer.gameName);
    if (gameState) {
      socket.join(newPlayer.gameName);
      player = gameState.connectPlayer(socket.id, newPlayer);
      socketIo.to(newPlayer.gameName).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
      socketIo.to(newPlayer.gameName).emit(API.ADD_PLAYERS, gameState.getPlayers());
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());

      socket.on(API.UPDATE_KEYS, function(keys: Array<string>) {
        gameState.setKeys(socket.id, keys);
      });

      socket.on(API.ACTIVATE_PLAYER, function() {
        console.log('Player activated: ', socket.id);
        gameState.setPlayerActive(socket.id);
        socketIo.to(newPlayer.gameName).emit(API.ADD_NEW_PLAYER, player);

        setInterval(() => {
          gameState.move(socket.id);
          gameState.updateBullets();
          gameState.detectBulletsCollision();
          socketIo.to(newPlayer.gameName).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
          socketIo.to(newPlayer.gameName).emit(API.GET_BULLETS, gameState.getBullets());
        }, 1000 / 60);
      });

      socket.on(API.MOUSE_CLICK, function(mouseClick: MouseCoordinates) {
        const bullet = gameState.addBullet(mouseClick);
        socketIo.to(newPlayer.gameName).emit(API.ADD_NEW_BULLET, bullet);
      });

      socket.on(API.UPDATE_DIRECTION, function(mouseCoordinates: MouseCoordinates) {
        gameState.updatePlayerDirection(mouseCoordinates);
      });

      socket.on('disconnect', function() {
        const disconnected = gameState.getPlayer(socket.id);
        console.log('Disconnected player: ', disconnected);
        gameState.disconnectPlayer(disconnected);
        socketIo.to(newPlayer.gameName).emit(API.DISCONNECT_PLAYER, socket.id);
        socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
      });

      socketIo.to(newPlayer.gameName).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
    }
  });
});

httpServer.listen(parseInt(port, 0), function() {
  console.log(`listening on *:${port}`);
});
