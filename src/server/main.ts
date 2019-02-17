import * as express from 'express';
import * as http from 'http';
import { listen, Socket } from 'socket.io';

import GamesStore from './services/GamesStore';
import NewPlayer from '../shared/apiModels/NewPlayer';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import Bullet from './models/Bullet';
import Player from './models/Player';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = listen(httpServer);
const gamesStory = new GamesStore();

app.use(express.static('dist/client'));

class Connection {
  player: Player;
  gameName: string;
  gameState: any;
  interval;

  constructor(private socket: Socket) {
    this.init();
  }

  init() {
    console.log('Connected:', this.socket.id);
    setTimeout(() => {
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
      this.socket.emit(API.WELCOME_NEW_PLAYER, this.socket.id);
    }, TIMEOUT);
    this.registerGameMenuEvents();
  }

  registerGameMenuEvents() {
    this.socket.on(API.CREATE_GAME, (newGame: NewGame) => {
      gamesStory.createGame(this, newGame.name, newGame.type, newGame.map);
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
    });

    this.socket.on(API.CREATE_PLAYER, (newPlayer: NewPlayer) => {
      this.gameState = gamesStory.getGame(newPlayer.gameName);
      if (this.gameState) {
        this.gameName = this.gameState.gameName;
        this.initNewPlayer(newPlayer);

        this.registerPlayerEvents();

        this.runGameLoop();
      }
    });
  }

  initNewPlayer(newPlayer) {
    this.player = this.gameState.connectPlayer(this.socket.id, newPlayer);
    this.socket.join(this.gameName);
    socketIo.to(this.gameName).emit(API.ADD_NEW_PLAYER, this.player);
    socketIo.to(this.gameName).emit(API.ADD_PLAYERS, this.gameState.getPlayers());
    socketIo.to(this.gameName).emit(API.GET_STATIC_OBJECTS, this.gameState.getStaticObjects());
    socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
  }

  runGameLoop() {
    this.interval = setInterval(() => {
      this.gameState.updatePlayerPosition(this.socket.id);
      this.gameState.updateBullets();
      this.gameState.detectBulletsCollision();
      socketIo.to(this.gameName).emit(API.GET_PLAYERS_STATE, this.gameState.getPlayers());
      socketIo.to(this.gameName).emit(API.GET_BULLETS, this.gameState.getBullets());
    }, 1000 / 60);
  }
  registerPlayerEvents() {
    this.socket.on(API.UPDATE_KEYS, (keys: Array<string>) => {
      this.gameState.setKeys(this.socket.id, keys);
    });

    this.socket.on(API.MOUSE_CLICK, (mouseClick: MouseCoordinates) => {
      this.gameState.onMouseClick(mouseClick);
    });

    this.socket.on(API.UPDATE_DIRECTION, (mouseCoordinates: MouseCoordinates) => {
      this.gameState.updatePlayerDirection(mouseCoordinates);
    });

    this.socket.on('disconnect', () => {
      if (this.player) {
        this.gameState.disconnectPlayer(this.player);
      }
      console.log('Disconnected player: ', this.player);
      socketIo.to(this.gameName).emit(API.DISCONNECT_PLAYER, this.socket.id);
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
      clearInterval(this.interval);
    });
  }

  sendNewBullet(bullet: Bullet) {
    socketIo.to(this.gameName).emit(API.ADD_NEW_BULLET, bullet);
  }
}

socketIo.on('connection', (socket: Socket) => {
  new Connection(socket);
});

httpServer.listen(parseInt(port, 0), function() {
  console.log(`listening on *:${port}`);
});
