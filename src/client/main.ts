import { Scene, WebGLRenderer } from 'three';
import { connect } from 'socket.io-client';

import MenuComponent from './UserInterface/MenuComponent';
import Game from './Game';
import './style.scss';
import NewUser from '../shared/apiModels/NewUser';
import NewGame from '../shared/apiModels/NewGame';
import { API } from '../shared/constants';
import GameInstance from '../shared/apiModels/GameInstance';
import ScreenModel from './interfaces/ScreenModel';
import { createGamesService, gamesListService, userService } from './store/store';
import { randColor } from '../shared/helpers';

const s = process.env.NODE_ENV === 'production' ? 's' : '';
const url = `http${s}://${process.env.URL || 'localhost'}`;
const socket = connect(url);

let mainInstance: Main;
let requestId: number;

class Main {
  private menu: MenuComponent;
  private gameState: Game;
  private events: any;

  constructor() {
    this.menu = new MenuComponent(this);
    mainInstance = this;

    socket.on(API.WELCOME_NEW_PLAYER, function(id: string) {
      userService.setId(id);
    });

    socket.on(API.GET_GAMES_LIST, function(gamesList: GameInstance[]) {
      gamesListService.clearGamesList();
      gamesList.forEach(game => gamesListService.addGame(game));
      if (gamesList.length > 0) {
        const game = gamesList[gamesList.length - 1].roomName;
        userService.chooseGame(game);
        mainInstance.menu.render();
      }
    });
  }

  onAddNewGame(newGame: NewGame) {
    socket.emit(API.CREATE_GAME, newGame);
    userService.chooseGame(newGame.roomName);
  }

  onJoinGame() {
    document.body.requestFullscreen().then(() => {
      const userState = userService.getState();
      const newPlayer = new NewUser(
        userState.id,
        userState.nick,
        userState.team || userState.nick,
        randColor(),
        userState.chosenGame,
      );
      const gameConfig = gamesListService
        .getState()
        .list.find(game => game.roomName === userState.chosenGame);
      socket.emit(API.CREATE_PLAYER, newPlayer);
      const screen = this.prepareScreen();
      this.gameState = new Game(newPlayer, screen, gameConfig);
      this.registerEvents(this.gameState);
      this.menu.hide();
      this.run();
    });
  }

  checkFunctionalButton(e: KeyboardEvent) {
    this.menu.togglePopup(e, 'F7', '#popupControl');
    this.menu.togglePopup(e, 'F8', '#popupOptions');
    this.menu.requestFullscreen(e, 'F11');
  }

  registerEvents(gameState: Game) {
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
        socket.emit(API.MOUSE_CLICK, gameState.getUserID());
      },
      mouseUp(e: MouseEvent) {
        e.preventDefault();
        socket.emit(API.MOUSE_UP, gameState.getUserID());
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
    this.menu.closePopup();
    location.reload();
  }
}

window.onload = function() {
  const main = new Main();
};
