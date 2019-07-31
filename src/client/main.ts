import { combineReducers, createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { Scene, WebGLRenderer } from 'three';
import { connect } from 'socket.io-client';

import { addGame, chooseGame, clearGamesList, setId } from './store/actions';
import { joinGameReducer, newGameReducer } from './store/reducers';
import MenuComponent from './UserInterface/MenuComponent';
import GameState from './GameState';
import './style.scss';
import NewUser from '../shared/apiModels/NewUser';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import GameInstance from '../shared/apiModels/GameInstance';
import ScreenModel from './types/ScreenModel';

let url = process.env.URL || 'localhost';
url = `http://${url.toString()}`;
const socket = connect(url);

const config = {
  menu: false,
  fps: 100,
};

function randRGB() {
  return Math.floor(Math.random() * 255);
}

function randColor() {
  return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
}

const app = combineReducers({
  newGame: newGameReducer,
  joinGame: joinGameReducer,
});
const store = createStore(app, devToolsEnhancer());

let mainInstance: Main;
let requestId: number;

class Main {
  private menu: MenuComponent;
  private gameState: GameState;
  private events: any;

  constructor() {
    this.menu = new MenuComponent(this, store);
    mainInstance = this;

    socket.on(API.WELCOME_NEW_PLAYER, function(id: string) {
      store.dispatch(setId(id));
    });

    socket.on(API.GET_GAMES_LIST, function(gamesList: GameInstance[]) {
      store.dispatch(clearGamesList());
      gamesList.forEach(game =>
        store.dispatch(addGame(game.roomName, game.type, game.map, game.count)),
      );
    });
  }

  onAddNewGame({ roomName, type, map }: NewGame) {
    const newGame = new NewGame(roomName, type, map);
    socket.emit(API.CREATE_GAME, newGame);
    store.dispatch(chooseGame(roomName));
  }

  onJoinGame() {
    const userState = store.getState().joinGame;
    const newPlayer = new NewUser(userState.id, userState.nick, randColor(), userState.chosenGame);
    socket.emit(API.CREATE_PLAYER, newPlayer);
    const screen = this.prepareScreen();
    this.gameState = new GameState(newPlayer, screen);
    this.registerEvents(this.gameState);
    this.run();
  }

  registerEvents(gameState: GameState) {
    socket.on(API.ADD_NEW_PLAYER, gameState.appendNewPlayer.bind(gameState));

    socket.on(API.ADD_PLAYERS, gameState.appendPlayers.bind(gameState));

    socket.on(API.ADD_NEW_BULLET, gameState.appendNewBullets.bind(gameState));

    socket.on(API.GET_PLAYERS_STATE, gameState.updatePlayersState.bind(gameState));

    socket.on(API.GET_BULLETS, gameState.updateBulletsState.bind(gameState));

    socket.on(API.GET_STATIC_OBJECTS, gameState.appendStaticObjects.bind(gameState));

    socket.on(API.GET_ITEM_GENERATORS, gameState.appendItemGenerators.bind(gameState));

    socket.on(API.UPDATE_ITEM_GENERATOR, gameState.updateItemGenerator.bind(gameState));

    socket.on(API.DISCONNECT_PLAYER, gameState.removePlayer.bind(gameState));

    socket.on(API.GET_WEAPON_DETAILS, gameState.updateWeaponInfo.bind(gameState));

    socket.on(API.LEAVE_GAME, () => {
      this.leaveGame();
    });

    socket.on(API.DISCONNECT, () => {
      console.log('Failed to connect to server');
      this.leaveGame();
    });

    this.events = {
      mouseDown(e: MouseEvent) {
        e.preventDefault();
        const mouseClick = gameState.getMouseCoordinates();
        socket.emit(API.MOUSE_CLICK, mouseClick);
      },
      mouseMove(e: MouseEvent) {
        const mouseCoordinates = gameState.getUpdatedMouseCoordinates(e);
        if (mouseCoordinates) {
          socket.emit(API.UPDATE_DIRECTION, mouseCoordinates);
        }
      },
      keyDown(e: KeyboardEvent) {
        e.preventDefault();
        if (!e.repeat) {
          gameState.addKey(e);
          socket.emit(API.UPDATE_KEYS, gameState.getKeys());
        }
      },
      keyUp(e: KeyboardEvent) {
        e.preventDefault();
        gameState.deleteKey(e);
        socket.emit(API.UPDATE_KEYS, gameState.getKeys());
      },
      wheel(e: WheelEvent) {
        e.preventDefault();
        gameState.wheel(e);
      },
    };

    window.addEventListener('mousedown', this.events.mouseDown);

    window.addEventListener('mousemove', this.events.mouseMove, false);

    window.addEventListener('keydown', this.events.keyDown);

    window.addEventListener('keyup', this.events.keyUp);

    window.addEventListener('wheel', this.events.wheel);
  }

  prepareScreen(): ScreenModel {
    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    renderer.autoClear = true;
    renderer.toneMappingExposure = Math.pow(0.68, 5.0); // to allow for very bright scenes.
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    return {
      scene,
      renderer,
    };
  }

  run() {
    requestId = requestAnimationFrame(mainInstance.run);
    mainInstance.gameState.update();
    mainInstance.gameState.render();
  }

  leaveGame() {
    // location.reload();
    cancelAnimationFrame(requestId);
    window.removeEventListener('mousedown', this.events.mouseDown);
    window.removeEventListener('mousemove', this.events.mouseMove);
    window.removeEventListener('keydown', this.events.keyDown);
    window.removeEventListener('keyup', this.events.keyUp);
    window.removeEventListener('wheel', this.events.wheel);
    socket.removeAllListeners(API.ADD_NEW_PLAYER);
    socket.removeAllListeners(API.ADD_PLAYERS);
    socket.removeAllListeners(API.GET_PLAYERS_STATE);
    socket.removeAllListeners(API.GET_BULLETS);
    socket.removeAllListeners(API.GET_STATIC_OBJECTS);
    socket.removeAllListeners(API.GET_ITEM_GENERATORS);
    socket.removeAllListeners(API.UPDATE_ITEM_GENERATOR);
    socket.removeAllListeners(API.DISCONNECT_PLAYER);
    socket.removeAllListeners(API.GET_WEAPON_DETAILS);
    socket.removeAllListeners(API.LEAVE_GAME);
    socket.removeAllListeners(API.DISCONNECT);
    this.gameState.dispose();
    this.gameState = null;
    this.menu.show();
  }
}

window.onload = function() {
  const main = new Main();
};
