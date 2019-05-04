import { combineReducers, createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
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

let mainInstance;

class Main {
  private menu: MenuComponent;
  private gameState: GameState;

  constructor() {
    this.menu = new MenuComponent(this, store);
    mainInstance = this;

    socket.on(API.WELCOME_NEW_PLAYER, function(id: string) {
      store.dispatch(setId(id));
    });

    socket.on(API.GET_GAMES_LIST, function(gamesList: GameInstance[]) {
      console.log('GET_GAMES_LIST', gamesList);
      store.dispatch(clearGamesList());
      gamesList.forEach(game =>
        store.dispatch(addGame(game.name, game.type, game.map, game.count)),
      );
    });
  }

  onAddNewGame({ name, type, map }: NewGame) {
    const newGame = new NewGame(name, type, map);
    socket.emit(API.CREATE_GAME, newGame);
    store.dispatch(chooseGame(name));
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

    // socket.on(API.LEAVE_GAME, () => {
    //   console.log('leave');
    //   gameState.screen.renderer.domElement.remove();
    //   this.menu.show();
    // });

    window.addEventListener('mousedown', function(e: MouseEvent) {
      e.preventDefault();
      const mouseClick = gameState.getMouseCoordinates();
      socket.emit(API.MOUSE_CLICK, mouseClick);
    });

    window.addEventListener(
      'mousemove',
      function mouseMove(e: MouseEvent) {
        const mouseCoordinates = gameState.getUpdatedMouseCoordinates(e);
        if (mouseCoordinates) {
          socket.emit(API.UPDATE_DIRECTION, mouseCoordinates);
        }
      },
      false,
    );

    window.addEventListener('keydown', function(e: KeyboardEvent) {
      e.preventDefault();
      if (!e.repeat) {
        gameState.addKey(e);
        socket.emit(API.UPDATE_KEYS, gameState.getKeys());
      }
    });

    window.addEventListener('keyup', function(e: KeyboardEvent) {
      e.preventDefault();
      gameState.deleteKey(e);
      socket.emit(API.UPDATE_KEYS, gameState.getKeys());
    });

    window.addEventListener('wheel', function(e: WheelEvent) {
      e.preventDefault();
      gameState.wheel(e);
    });
  }

  prepareScreen(): ScreenModel {
    const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    camera.position.z = 400;
    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
    renderer.autoClear = true;
    renderer.toneMappingExposure = Math.pow(0.68, 5.0); // to allow for very bright scenes.
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    return {
      camera: camera,
      scene: scene,
      renderer: renderer,
    };
  }

  run() {
    mainInstance.gameState.tryRenderEverything();
    requestAnimationFrame(mainInstance.run);
  }
}

window.onload = function() {
  const main = new Main();
};
