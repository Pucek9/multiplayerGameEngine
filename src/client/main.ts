import { Scene, WebGLRenderer } from 'three';
import { connect } from 'socket.io-client';

import MenuComponent from './UserInterface/MenuComponent';
import GameState from './GameState';
import './style.scss';
import NewUser from '../shared/apiModels/NewUser';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import GameInstance from '../shared/apiModels/GameInstance';
import ScreenModel from './types/ScreenModel';
import { gamesService, userService } from './store/store';
import { randColor } from '../shared/helpers';

const s = process.env.NODE_ENV === 'production' ? 's' : '';
const url = `http${s}://${process.env.URL || 'localhost'}`;
const socket = connect(url);

let mainInstance: Main;
let requestId: number;

class Main {
  private menu: MenuComponent;
  private gameState: GameState;
  private events: any;

  constructor() {
    this.menu = new MenuComponent(this);
    mainInstance = this;

    socket.on(API.WELCOME_NEW_PLAYER, function(id: string) {
      userService.setId(id);
    });

    socket.on(API.GET_GAMES_LIST, function(gamesList: GameInstance[]) {
      gamesService.clearGamesList();
      gamesList.forEach(game =>
        gamesService.addGame(game.roomName, game.type, game.map, game.count),
      );
      if (gamesList.length > 0) {
        const game = gamesList[gamesList.length - 1].roomName;
        userService.chooseGame(game);
        mainInstance.menu.render();
      }
    });
  }

  onAddNewGame({ roomName, type, map, bots }: NewGame) {
    const newGame = new NewGame(roomName, type, map, bots);
    socket.emit(API.CREATE_GAME, newGame);
    userService.chooseGame(roomName);
  }

  onJoinGame() {
    document.body.requestFullscreen().then(() => {
      const userState = userService.getState();
      const newPlayer = new NewUser(
        userState.id,
        userState.nick,
        randColor(),
        userState.chosenGame,
      );
      socket.emit(API.CREATE_PLAYER, newPlayer);
      const screen = this.prepareScreen();
      this.gameState = new GameState(newPlayer, screen);
      this.registerEvents(this.gameState);
      this.menu.hide();
      this.run();
    });
  }

  checkFunctionalButton(e: KeyboardEvent) {
    if (e.key === 'F7') {
      location.hash = location.hash === '#popupControl' ? '' : '#popupControl';
    }
    if (e.key === 'F8') {
      location.hash = location.hash === '#popupOptions' ? '' : '#popupOptions';
    }
    if (e.key === 'F11') {
      document.body.requestFullscreen();
    }
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

    socket.on(API.UPDATE_TIME_TO_REVIVE, gameState.updateTimeToRevive.bind(gameState));

    socket.on(API.DISCONNECT_PLAYER, gameState.removePlayer.bind(gameState));

    socket.on(API.GET_WEAPON_DETAILS, gameState.updateWeaponInfo.bind(gameState));

    socket.on(API.GET_POWER_DETAILS, gameState.updatePowersInfo.bind(gameState));

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
      mouseUp(e: MouseEvent) {
        e.preventDefault();
        const mouseClick = gameState.getMouseCoordinates();
        socket.emit(API.MOUSE_UP, mouseClick);
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
          mainInstance.checkFunctionalButton(e);
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

    window.addEventListener('mouseup', this.events.mouseUp);

    window.addEventListener('mousemove', this.events.mouseMove, false);

    window.addEventListener('keydown', this.events.keyDown);

    window.addEventListener('keyup', this.events.keyUp);

    window.addEventListener('wheel', this.events.wheel);

    window.addEventListener('resize', mainInstance.gameState.handleResize, false);
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
    location.hash = '';
    location.reload();
  }
}

window.onload = function() {
  const main = new Main();
};
