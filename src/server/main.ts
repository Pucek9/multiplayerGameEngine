import * as express from 'express';
import * as http from 'http';
import { listen, Socket } from 'socket.io';

import GamesStore from './services/GamesStore';
import NewUser from '../shared/apiModels/NewUser';
import MouseCoordinates from '../shared/apiModels/MouseCoordinates';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import Player from './models/Player';
import NewBullet from '../shared/apiModels/NewBullet';
import ItemGenerator from './models/ItemGenerator';
import Item from '../shared/models/Item';
import ItemGeneratorAPI from '../shared/apiModels/ItemGenerator';
import Weapon from './models/weapons/Weapon';

const TIMEOUT = 1000;
const port = process.env.PORT || '80';
const app = express();
const httpServer = http.createServer(app);
const socketIo = listen(httpServer);
const gamesStory = new GamesStore();

app.use(express.static('dist/client'));

class Connection {
  // player: Player;
  // gameName: string;
  // gameState: any;

  constructor(private socket: Socket) {
    this.init();
  }

  init() {
    console.log(`[${this.socket.id}] Connected`);
    setTimeout(() => {
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
      this.socket.emit(API.WELCOME_NEW_PLAYER, this.socket.id);
    }, TIMEOUT);
    this.registerGameMenuEvents();
  }

  registerGameMenuEvents() {
    this.socket.on(API.CREATE_GAME, (newGame: NewGame) => {
      console.log(`[${this.socket.id}] Created game '${newGame.name}'`);
      gamesStory.createGame(this, newGame.name, newGame.type, newGame.map);
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
    });

    this.socket.on(API.CREATE_PLAYER, (newPlayer: NewUser) => {
      const gameState = gamesStory.getGame(newPlayer.gameName);
      if (gameState) {
        const gameName = gameState.name;
        console.log(`[${this.socket.id}] Player '${newPlayer.name}' joined to '${gameName}'`);
        this.joinToRoom(gameName);
        this.initNewPlayer(newPlayer, gameState, gameName);
        this.registerPlayerEvents(gameState);
      }
    });

    this.socket.on(API.DISCONNECT, () => {
      console.log(`[${this.socket.id}] Disconnected`);
      const gameState = gamesStory.getGameByPlayer(this.socket.id);
      if (gameState) {
        const disconnected = gameState.getPlayer(this.socket.id);
        gameState.disconnectPlayer(disconnected);
        this.disconnectPlayer(disconnected.name);
      }
    });
  }

  joinToRoom(gameName) {
    this.socket.join(gameName);
  }

  initNewPlayer(newPlayer, gameState, gameName) {
    const player = gameState.connectPlayer(this.socket.id, newPlayer);
    socketIo.to(gameName).emit(API.ADD_NEW_PLAYER, player);
    socketIo.to(newPlayer.id).emit(API.ADD_PLAYERS, gameState.getPlayers());
    socketIo.to(newPlayer.id).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
    socketIo.to(newPlayer.id).emit(API.GET_ITEM_GENERATORS, gameState.getItemGeneratorsAPI());
    socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
  }

  registerPlayerEvents(gameState) {
    this.socket.on(API.UPDATE_KEYS, (keys: Array<string>) => {
      gameState.updateKeys(this.socket.id, keys);
    });
    this.socket.on(API.MOUSE_CLICK, (mouseClick: MouseCoordinates) => {
      gameState.mouseClick(mouseClick);
    });
    this.socket.on(API.UPDATE_DIRECTION, (mouseCoordinates: MouseCoordinates) => {
      gameState.updatePlayerDirection(mouseCoordinates);
    });
  }

  emitGameState(gameState) {
    socketIo.to(gameState.name).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
    socketIo.to(gameState.name).emit(API.GET_BULLETS, gameState.getBullets());
  }

  disconnectPlayer(name) {
    const gameState = gamesStory.getGameByPlayer(this.socket.id);
    if (gameState) {
      const gameName = gameState.name;
      console.log(`[${this.socket.id}] Player '${name}' left '${gameName}'`);
      socketIo.to(gameName).emit(API.DISCONNECT_PLAYER, this.socket.id);
      socketIo.emit(API.GET_GAMES_LIST, gamesStory.getGamesList());
      this.socket.emit(API.LEAVE_GAME);
      this.socket.leave(gameName);
    }

    // this.socket.removeAllListeners(API.UPDATE_KEYS);
    // this.socket.removeAllListeners(API.MOUSE_CLICK);
    // this.socket.removeAllListeners(API.UPDATE_DIRECTION);
    // delete this.gameState;
    // delete this.gameName;
    // delete this.player;
  }

  sendNewBullets(gameState, bullets: NewBullet[]) {
    socketIo.to(gameState.name).emit(API.ADD_NEW_BULLET, bullets);
  }

  updateWeaponInfo(id: string, weaponInfo: { selectedWeapon: Weapon; weapons: Item[] }) {
    socketIo.to(id).emit(API.GET_WEAPON_DETAILS, weaponInfo);
  }

  updateItemGenerator(gameState, itemGenerator: ItemGeneratorAPI) {
    socketIo.to(gameState.name).emit(API.UPDATE_ITEM_GENERATOR, itemGenerator);
  }
}

socketIo.on(API.CONNECTION, (socket: Socket) => {
  new Connection(socket);
});

httpServer.listen(parseInt(port, 0), function() {
  console.log(`App listening on *:${port}`);
});
