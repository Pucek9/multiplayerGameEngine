import * as express from 'express';
import * as http from 'http';
import { listen, Socket } from 'socket.io';

import { API } from '../shared/constants';
import GamesManager from './services/GamesManager';
import NewUser from '../shared/apiModels/NewUser';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewGame from '../shared/apiModels/NewGame';
import Emitter from './services/Emitter';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = listen(httpServer);
const gamesMamager = new GamesManager();
const emitter = new Emitter(socketIo);

app.use(express.static('dist/client'));

function connection(socket: Socket) {
  function init() {
    console.log(`[${socket.id}] Connected`);
    setTimeout(() => {
      socketIo.emit(API.GET_GAMES_LIST, gamesMamager.getGamesList());
      socket.emit(API.WELCOME_NEW_PLAYER, socket.id);
    }, TIMEOUT);
    registerGameMenuEvents();
  }

  function registerGameMenuEvents() {
    socket.on(API.CREATE_GAME, (newGame: NewGame) => {
      console.log(`[${socket.id}] Created game '${newGame.name}'`);
      gamesMamager.createGame(emitter, newGame.name, newGame.type, newGame.map);
      socketIo.emit(API.GET_GAMES_LIST, gamesMamager.getGamesList());
    });

    socket.on(API.CREATE_PLAYER, (newPlayer: NewUser) => {
      const gameState = gamesMamager.getGame(newPlayer.gameName);
      if (gameState) {
        console.log(`[${socket.id}] Player '${newPlayer.name}' joined to '${gameState.roomName}'`);
        joinToRoom(gameState.roomName);
        initNewPlayer(newPlayer, gameState);
        registerPlayerEvents(gameState);
      }
    });

    socket.on(API.DISCONNECT, () => {
      console.log(`[${socket.id}] Disconnected`);
      const gameState = gamesMamager.getGameByPlayer(socket.id);
      if (gameState) {
        const disconnected = gameState.getPlayer(socket.id);
        gameState.disconnectPlayer(disconnected);
        disconnectPlayer(gameState, disconnected.name);
      }
    });
  }

  function joinToRoom(roomName: string) {
    socket.join(roomName);
  }

  function initNewPlayer(newPlayer, gameState) {
    const player = gameState.connectPlayer(socket.id, newPlayer);
    socketIo.to(gameState.roomName).emit(API.ADD_NEW_PLAYER, player);
    socketIo.to(newPlayer.id).emit(API.ADD_PLAYERS, gameState.getPlayers());
    socketIo.to(newPlayer.id).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
    socketIo.to(newPlayer.id).emit(API.GET_ITEM_GENERATORS, gameState.getItemGeneratorsAPI());
    socketIo.emit(API.GET_GAMES_LIST, gamesMamager.getGamesList());
  }

  function registerPlayerEvents(gameState) {
    socket.on(API.UPDATE_KEYS, (keys: Array<string>) => {
      gameState.updateKeys(socket.id, keys);
    });
    socket.on(API.MOUSE_CLICK, (mouseClick: MouseCoordinates) => {
      gameState.mouseClick(mouseClick);
    });
    socket.on(API.UPDATE_DIRECTION, (mouseCoordinates: MouseCoordinates) => {
      gameState.updatePlayerDirection(mouseCoordinates);
    });
  }

  function disconnectPlayer(gameState, name) {
    if (gameState) {
      const roomName = gameState.roomName;
      console.log(`[${socket.id}] Player '${name}' left '${roomName}'`);
      socketIo.to(roomName).emit(API.DISCONNECT_PLAYER, socket.id);
      socketIo.emit(API.GET_GAMES_LIST, gamesMamager.getGamesList());
      socket.emit(API.LEAVE_GAME);
      socket.leave(roomName);
    }

    // this.socket.removeAllListeners(API.UPDATE_KEYS);
    // this.socket.removeAllListeners(API.MOUSE_CLICK);
    // this.socket.removeAllListeners(API.UPDATE_DIRECTION);
    // delete this.gameState;
    // delete this.gameName;
    // delete this.player;
  }

  init();
}

socketIo.on(API.CONNECTION, (socket: Socket) => {
  connection(socket);
});

httpServer.listen(parseInt(port, 0), function() {
  console.log(`App listening on *:${port}`);
});
