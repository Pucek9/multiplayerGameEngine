import NewGame from '../shared/api/NewGame';

import {createStore, combineReducers} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import {addGame, clearGamesList, setId} from './actions';
import {newGame, joinGame} from './reducers';
import './style.scss';

import NewPlayer from '../shared/api/NewPlayer';
import Cursor from './models/Cursor';
import Map from './models/Map';
import Loop from './Loop';
import Menu from './menu/Menu';
import * as constants from '../shared/constants.json';

const THREE = require('three');
const io = require('socket.io-client');

const API = (<any>constants).API;

let url = process.env.URL || 'localhost';
url = `http://${url.toString()}`;
const socket = io.connect(url);


function randRGB() {
    return Math.floor(Math.random() * 255);
}

function randColor() {
    return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
}

const app = combineReducers({newGame, joinGame});
const store = createStore(app, devToolsEnhancer());

class Main {

    private menu: Menu;

    constructor() {
        this.menu = new Menu(this, store);

        socket.on(API.WELCOME_NEW_PLAYER, function (data) {
            store.dispatch(setId(data.socketId))
        });

        socket.on(API.GET_GAMES_LIST, function (data) {
            console.log('GET_GAMES_LIST', data);
            store.dispatch(clearGamesList());
            data.forEach(game => store.dispatch(addGame(game.name, game.type, game.map, game.count)));
        })

    }

    onJoinGame() {
        const userState = store.getState().joinGame;
        const newPlayer = new NewPlayer(userState.id, userState.nick, randColor(), userState.chosenGame);
        socket.emit(API.CREATE_PLAYER, newPlayer);
        alert(newPlayer.name + ' joined the game! Click mouse after close that!');
        const screen = this.prepareScreen();
        const loop = new Loop(socket, newPlayer, screen);
        loop.run();
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
}

window.onload = function () {
    const main = new Main()
};
