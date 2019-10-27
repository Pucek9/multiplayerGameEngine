import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { listen, Socket } from 'socket.io';

import { API } from '../shared/constants';
import gamesManager from './services/GamesManager';
import NewUser from '../shared/apiModels/NewUser';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewGame from '../shared/apiModels/NewGame';
import Emitter from './services/Emitter';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const url = process.env.URL || 'localhost';
const app = express();
const httpServer = http.createServer(app);
const socketIo = listen(httpServer);
const emitter = new Emitter(socketIo);
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.static('dist/client'), cors(corsOptions));

function connection(socket: Socket) {
  function init() {
    console.log(`[${socket.id}] Connected`);
    setTimeout(() => {
      emitter.emitGamesList();
      socketIo.to(socket.id).emit(API.WELCOME_NEW_PLAYER, socket.id);
    }, TIMEOUT);
    registerGameMenuEvents();
  }

  function registerGameMenuEvents() {
    socket.on(API.CREATE_GAME, (newGame: NewGame) => {
      console.log(`[${socket.id}] Created game '${newGame.roomName}'`);
      gamesManager.createGame(emitter, newGame);
      emitter.emitGamesList();
    });

    socket.on(API.CREATE_PLAYER, (newPlayer: NewUser) => {
      const gameState = gamesManager.getGame(newPlayer.gameName);
      if (gameState) {
        console.log(`[${socket.id}] Player '${newPlayer.name}' joined to '${gameState.roomName}'`);
        joinToRoom(gameState.roomName);
        initNewPlayer(newPlayer, gameState);
        registerPlayerEvents(gameState);
      }
    });

    socket.on(API.DISCONNECT, () => {
      console.log(`[${socket.id}] Disconnected`);
      const gameState = gamesManager.getGameByPlayer(socket.id);
      if (gameState) {
        const disconnected = gameState.getPlayer(socket.id);
        gameState.disconnectPlayer(disconnected);
      }
    });
  }

  function joinToRoom(roomName: string) {
    socket.join(roomName);
  }

  function initNewPlayer(newPlayer, gameState) {
    const player = gameState.connectPlayer(newPlayer);
    socketIo.to(gameState.roomName).emit(API.ADD_NEW_PLAYER, player);
    socketIo.to(newPlayer.id).emit(API.ADD_PLAYERS, gameState.getPlayers());
    socketIo.to(newPlayer.id).emit(API.ADD_NEW_BULLET, gameState.getBullets());
    socketIo.to(newPlayer.id).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
    socketIo.to(newPlayer.id).emit(API.GET_ITEM_GENERATORS, gameState.getItemGeneratorsAPI());
    emitter.emitGamesList();
  }

  function registerPlayerEvents(gameState) {
    socket.on(API.UPDATE_KEYS, (keys: Array<string>) => {
      gameState.updateKeys(socket.id, keys);
    });
    socket.on(API.MOUSE_CLICK, (owner: string) => {
      gameState.mouseClick(owner);
    });
    socket.on(API.MOUSE_UP, (owner: string) => {
      gameState.mouseUp(owner);
    });
    socket.on(API.UPDATE_DIRECTION, (mouseCoordinates: MouseCoordinates) => {
      gameState.updateCursor(mouseCoordinates);
    });
  }

  init();
}

socketIo.on(API.CONNECTION, (socket: Socket) => {
  connection(socket);
});

httpServer.listen(parseInt(port, 0), function() {
  console.log(`App listening on ${url}:${port}`);
});
