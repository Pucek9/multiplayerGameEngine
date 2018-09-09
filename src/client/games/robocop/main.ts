declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var addNewGameButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;

import NewPlayer from "../../../shared/api/NewPlayer";
import Player from "../../../server/models/Player";
import Cursor from '../../models/Cursor';
import Map from '../../models/Map';
import Loop from '../../Loop';
import {newGame, joinGame} from '../../reducers';
import Menu from '../../models/Menu';
import * as constants from '../../../shared/constants.json';

import devToolsEnhancer from 'remote-redux-devtools';
import {createStore, combineReducers} from 'redux';
import {addGame, chooseGame, setNick, setGameName, setGameType} from '../../actions';

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

function registerUser(data) {
    const menu = new Menu('menu-background', startImageJPG);

    let name = prompt("Please enter your name", "Player");
    if (!(name === null || name === '')) {
        const newPlayer = new NewPlayer(data.socketId, name, randColor());
        socket.emit(API.CREATE_PLAYER, newPlayer);
        return newPlayer;
    } else {
        registerUser(data)
    }
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
        row.append(name, type, count);
        // @ts-ignore
        gamesListTable.append(row);
    });
    joinGameButton.disabled = state.joinGame.nick === '' || state.joinGame.chosenGame === null;
    addNewGameButton.disabled = state.newGame.name === '' || state.newGame.type === null;
}

addNewGameButton.addEventListener('click', function () {
    let name = gameNameInput.value;
    let type = gameTypeInput.value;
    store.dispatch(addGame(name, type, 0));
    gameNameInput.value = '';
});

gameNameInput.addEventListener('keyup', function () {
    store.dispatch(setGameName(gameNameInput.value))
});

gameTypeInput.addEventListener('change', function () {
    store.dispatch(setGameType(gameTypeInput.value))
});

nickInput.addEventListener('keyup', function () {
    store.dispatch(setNick(nickInput.value))
});

window.onload = function () {
    unsubscribeRender = store.subscribe(render);

    // console.log('Connected with: ' + url);
    //
    // socket.on(API.WELCOME_NEW_PLAYER, function (data) {
    //     const newPlayer = registerUser(data);
    //     alert(newPlayer.name + ' joined the game!');
    //     const screen = prepareScreen();
    //     const map = new Map(mapJPG);
    //     const cursor = new Cursor(cursorPNG);
    //     const loop = new Loop(socket, newPlayer, screen, cursor, map);
    //     loop.run();
    // });

};
