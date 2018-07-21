import NewPlayer from "../../../shared/api/NewPlayer";
import Player from "../../../server/models/Player";
import Cursor from '../../models/Cursor';
import Map from '../../models/Map';
import Loop from '../../Loop'
import Menu from "../../models/Menu";
const THREE = require('three');
import * as constants from '../../../shared/constants.json';

const io = require('socket.io-client');
const startImageJPG = require("./obrazki/start.jpg");
const mapJPG = require("./obrazki/test.jpg");
const cursorPNG = require("./obrazki/celownik.png");
const API = (<any>constants).API;

let url = process.env.API_URL || 'localhost';
url = 'http://' + url.toString() + ':3000';
const socket = io.connect(url);

console.log('Connected with: ' + url);

window.onload = function () {
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

    const screen = {
        camera : camera, scene: scene, renderer: renderer
    };

    const map = new Map(mapJPG);
    const menu = new Menu(startImageJPG, screen);
    const cursor = new Cursor(cursorPNG);

    function randRGB() {
        return Math.floor(Math.random() * 255);
    }

    function randColor() {
        return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
    }

    function registerUser(data) {
        let name = prompt("Please enter your name", "Player");
        if (!(name === null || name === '')) {
            const newPlayer = new NewPlayer(data.socketId, name, randColor());
            socket.emit(API.createPlayer, newPlayer);
            return newPlayer;
        } else {
            registerUser(data)
        }
    }

    socket.on(API.helloPlayer, function (data) {
        const newPlayer = registerUser(data);
        alert(newPlayer.name + ' joined the game!');
        const loop = new Loop(socket, newPlayer, screen, cursor, menu, map);
        loop.run();
    });

};