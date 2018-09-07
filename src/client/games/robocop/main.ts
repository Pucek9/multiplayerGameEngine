import NewPlayer from "../../../shared/api/NewPlayer";
import Player from "../../../server/models/Player";
import Cursor from '../../models/Cursor';
import Map from '../../models/Map';
import Loop from '../../Loop'
import Store from "../../Store";
import Menu from "../../models/Menu";
import * as constants from '../../../shared/constants.json';

const THREE = require('three');
const io = require('socket.io-client');
const startImageJPG = require("./obrazki/circuit_board.jpg");
const mapJPG = require("./obrazki/test.jpg");
const cursorPNG = require("./obrazki/celownik.png");
const API = (<any>constants).API;

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
        camera : camera, scene: scene, renderer: renderer
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

window.onload = function () {
    console.log('Connected with: ' + url);
    const store = new Store({},{})

    socket.on(API.WELCOME_NEW_PLAYER, function (data) {
        const newPlayer = registerUser(data);
        alert(newPlayer.name + ' joined the game!');
        const screen = prepareScreen();
        const map = new Map(mapJPG);
        const cursor = new Cursor(cursorPNG);
        const loop = new Loop(socket, newPlayer, screen, cursor, map);
        loop.run();
    });

};