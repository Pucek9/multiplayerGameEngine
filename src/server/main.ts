import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as ip from 'ip';
import { Server, Socket } from 'socket.io';

import { MouseCoordinates, NewGame, NewUser } from '../shared/apiModels';
import { API } from '../shared/constants';

import Emitter from './services/Emitter';
import gamesManager from './services/GamesManager';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const url = process.env.URL || ip.address() || 'localhost';
const env = process.env.NODE_ENV || 'development';
const s = process.env.NODE_ENV === 'production' ? 's' : '';
const app = express();
const httpServer = http.createServer(app);
const socketIo = new Server(httpServer);
const emitter = new Emitter(socketIo);
const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.static('dist/client'), cors(corsOptions));

function connection(socket: Socket) {
  function joinToRoom(roomName: string) {
    socket.join(roomName);
  }

  function initNewPlayer(newPlayer, gameState) {
    const player = gameState.connectPlayer(newPlayer);
    socketIo.to(gameState.roomName).emit(API.ADD_NEW_PLAYER, player);
    socketIo.to(newPlayer.id).emit(API.ADD_PLAYERS, gameState.getPlayers());
    socketIo.to(newPlayer.id).emit(API.ADD_NEW_BULLET, gameState.getNormalizedBullets());
    emitter.emitStaticObjects(newPlayer.id, gameState);
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
    socket.on(API.MOUSE_RIGHT_CLICK, (owner: string) => {
      gameState.mouseRightClick(owner);
    });
    socket.on(API.MOUSE_UP, (owner: string) => {
      gameState.mouseUp(owner);
    });
    socket.on(API.UPDATE_DIRECTION, (mouseCoordinates: MouseCoordinates) => {
      gameState.updateCursor(mouseCoordinates);
    });
  }

  function registerGameMenuEvents() {
    socket.on(API.CREATE_GAME, (newGame: NewGame) => {
      newGame.ip = socket.handshake.address;
      console.log(`[${newGame.ip}] Created game '${newGame.roomName}'`);
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

    socket.on(API.DELETE_GAME, (roomName: string) => {
      const game = gamesManager.getGame(roomName);
      if (game.ip === socket.handshake.address) {
        console.log(`[${game.ip}] Deleted game '${roomName}'`);
        gamesManager.deleteGame(game);
        emitter.emitGamesList();
      }
    });
  }

  function init() {
    const playerIP = socket.handshake.address;
    console.log(`[${socket.id}] ${playerIP} Connected`);
    setTimeout(() => {
      emitter.emitGamesList();
      socketIo.to(socket.id).emit(API.WELCOME_NEW_PLAYER, [socket.id, playerIP]);
    }, TIMEOUT);
    registerGameMenuEvents();
  }

  init();
}

socketIo.on(API.CONNECTION, (socket: Socket) => {
  connection(socket);
});

httpServer.listen(parseInt(port, 0), function () {
  console.log(`[${env}] App listening on http${s}://${url}:${port}`);
});
