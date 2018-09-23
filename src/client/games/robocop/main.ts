import NewGame from "../../../shared/api/NewGame";

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var addNewGameButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;
declare var menu: HTMLDivElement;

import {createStore, combineReducers} from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import {addGame, chooseGame, setNick, setGameName, setGameType, clearGamesList, setId, setGameMap} from '../../actions';
import {newGame, joinGame} from '../../reducers';
import '../../style.scss';

import NewPlayer from "../../../shared/api/NewPlayer";
import Player from "../../../server/models/Player";
import Cursor from '../../models/Cursor';
import Map from '../../models/Map';
import Loop from '../../Loop';
import Menu from '../../models/Menu';
import * as constants from '../../../shared/constants.json';

const THREE = require('three');
const io = require('socket.io-client');
const startImageJPG = require("./obrazki/circuit_board.jpg");
const mapJPG = require("./obrazki/test.jpg");
const cursorPNG = require("./obrazki/celownik.png");
const API = (<any>constants).API;

let unsubscribeRender;
let url = process.env.URL || 'localhost';
url = `http://${url.toString()}`;
const socket = io.connect(url);

function prepareScreen() {
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        2000);
    camera.position.z = 400;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return {
        camera: camera, scene: scene, renderer: renderer
    };
}

function randRGB() {
    return Math.floor(Math.random() * 255);
}

function randColor() {
    return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
}

const app = combineReducers({newGame, joinGame});
const store = createStore(app, devToolsEnhancer());
render();

function render() {
    console.log('render', store.getState());
    gamesListTable.innerHTML = '';
    const state = store.getState();
    state.newGame.list.forEach(game => {
        let name = document.createElement('td');
        name.appendChild(document.createTextNode(game.name));
        let type = document.createElement('td');
        type.appendChild(document.createTextNode(game.type));
        let map = document.createElement('td');
        map.appendChild(document.createTextNode(game.map));
        let count = document.createElement('td');
        count.appendChild(document.createTextNode(game.count));
        let row = document.createElement('tr');
        row.addEventListener("click", () => {
            store.dispatch(chooseGame(game.name))
        });
        if (state.joinGame.chosenGame === game.name) {
            row.style.backgroundColor = 'grey';
        }
        // @ts-ignore
        row.append(name, type, map, count);
        // @ts-ignore
        gamesListTable.append(row);
    });
    joinGameButton.disabled = state.joinGame.nick === '' || state.joinGame.chosenGame === null || state.joinGame.id === null;
    addNewGameButton.disabled = state.newGame.name === '' || state.newGame.type === null || state.newGame.map === null;
}

addNewGameButton.addEventListener('click', function () {
    const name = gameNameInput.value;
    const type = gameTypeInput.value;
    const map = gameMapInput.value;
    const newGame = new NewGame(name, type, map)
    socket.emit(API.CREATE_GAME, newGame);
    gameNameInput.value = '';
});

joinGameButton.addEventListener('click', function () {
    const userState = store.getState().joinGame;
    const newPlayer = new NewPlayer(userState.id, userState.nick, randColor(), userState.chosenGame);
    socket.emit(API.CREATE_PLAYER, newPlayer);
    alert(newPlayer.name + ' joined the game!');
    menu.style.display = 'none';
    const screen = prepareScreen();
    const map = new Map(mapJPG);
    const cursor = new Cursor(cursorPNG);
    const loop = new Loop(socket, newPlayer, screen, cursor, map);
    loop.run();

});

gameNameInput.addEventListener('keyup', function () {
    store.dispatch(setGameName(gameNameInput.value))
});

gameTypeInput.addEventListener('change', function () {
    store.dispatch(setGameType(gameTypeInput.value))
});

gameMapInput.addEventListener('change', function () {
    store.dispatch(setGameMap(gameMapInput.value))
});

nickInput.addEventListener('keyup', function () {
    store.dispatch(setNick(nickInput.value))
});


window.onload = function () {
    unsubscribeRender = store.subscribe(render);

    socket.on(API.WELCOME_NEW_PLAYER, function (data) {
        store.dispatch(setId(data.socketId))
    });

    socket.on(API.GET_GAMES_LIST, function (data) {
        console.log('GET_GAMES_LIST', data)
        store.dispatch(clearGamesList());
        data.forEach(game => store.dispatch(addGame(game.name, game.type, game.map, game.count)));

    })

};
