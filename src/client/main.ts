import {createStore, combineReducers} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
const THREE = require('three');
const io = require('socket.io-client');

import {addGame, clearGamesList, setId} from './store/actions';
import {newGame, joinGame} from './store/reducers';
import MenuComponent from './UserInterface/MenuComponent';
import GameState from "./GameState";
import './style.scss';

import NewPlayer from '../shared/apiModels/NewPlayer';
import NewGame from '../shared/apiModels/NewGame';
import {API} from '../shared/constants';

let url = process.env.URL || 'localhost';
url = `http://${url.toString()}`;
const socket = io.connect(url);


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

const app = combineReducers({newGame, joinGame});
const store = createStore(app, devToolsEnhancer());

let mainInstance;

class Main {

    private menu: MenuComponent;
    private gameState: GameState;

    constructor() {
        this.menu = new MenuComponent(this, store);
        mainInstance = this;

        socket.on(API.WELCOME_NEW_PLAYER, function (data) {
            store.dispatch(setId(data.socketId))
        });

        socket.on(API.GET_GAMES_LIST, function (data) {
            console.log('GET_GAMES_LIST', data);
            store.dispatch(clearGamesList());
            data.forEach(game => store.dispatch(addGame(game.name, game.type, game.map, game.count)));
        });

    }

    onJoinGame() {
        const userState = store.getState().joinGame;
        const newPlayer = new NewPlayer(userState.id, userState.nick, randColor(), userState.chosenGame);
        socket.emit(API.CREATE_PLAYER, newPlayer);
        alert(newPlayer.name + ' joined the game! Click mouse after close that!');
        const screen = this.prepareScreen();
        this.gameState = new GameState(newPlayer, screen);
        this.registerEvents(this.gameState);
        this.run();
    }

    registerEvents(gameState) {
        socket.on(API.ADD_NEW_PLAYER, gameState.appendNewPlayer.bind(gameState));

        socket.on(API.ADD_PLAYERS, gameState.appendPlayers.bind(gameState));

        socket.on(API.ADD_NEW_BULLET, gameState.appendNewBullet.bind(gameState));

        socket.on(API.GET_PLAYERS_STATE, gameState.updatePlayersState.bind(gameState));

        socket.on(API.GET_BULLETS, gameState.updateBulletsState.bind(gameState));

        socket.on(API.GET_STATIC_OBJECTS, gameState.appendStaticObjects.bind(gameState));

        socket.on(API.DISCONNECT_PLAYER, gameState.removePlayer.bind(gameState));

        window.addEventListener('mousedown', function (e) {
            e.preventDefault();
            if (config.menu === false) {
                config.menu = true;
                socket.emit(API.ACTIVATE_PLAYER);
            } else {
                const mouseClick = gameState.getMouseCoordinates();
                socket.emit(API.MOUSE_CLICK, mouseClick);
            }
        });

        window.addEventListener("mousemove", function mouseMove(e: MouseEvent) {
            const mouseCoordinates = gameState.getUpdatedMouseCoordinates(e);
            if (mouseCoordinates) {
                socket.emit(API.UPDATE_DIRECTION, mouseCoordinates);
            }
        }, false);

        window.addEventListener('keydown', function (e: KeyboardEvent) {
            e.preventDefault();
            if (!e.repeat) {
                gameState.addKey(e);
                socket.emit(API.UPDATE_KEYS, gameState.getKeys())
            }
        });

        window.addEventListener('keyup', function (e: KeyboardEvent) {
            e.preventDefault();
            gameState.deleteKey(e);
            socket.emit(API.UPDATE_KEYS, gameState.getKeys())
        });


        window.addEventListener("wheel", function (e: WheelEvent) {
            e.preventDefault();
            gameState.wheel(e);
        });
    }

    onAddNewGame({name, type, map}) {
        const newGame = new NewGame(name, type, map);
        socket.emit(API.CREATE_GAME, newGame);
    }

    prepareScreen() {
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.01,
            2000);
        camera.position.z = 400;
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = true;
        renderer.toneMappingExposure = Math.pow(0.68, 5.0); // to allow for very bright scenes.
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        return {
            camera: camera, scene: scene, renderer: renderer
        };
    }

    run() {
        mainInstance.gameState.tryRenderEverything();
        requestAnimationFrame(mainInstance.run);
    }
}

window.onload = function () {
    const main = new Main();
};
