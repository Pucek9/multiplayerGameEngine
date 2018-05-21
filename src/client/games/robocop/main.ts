import NewPlayer from "../../../api/NewPlayer";

const io = require('socket.io-client');
import Player from "../../../server/models/Player";
import Cursor from '../../../objects/Cursor';
import Map from '../../../objects/Map';
import {Loop} from '../../Loop'
const startImageJPG = require("./obrazki/start.jpg");
const startImageJPG2 = require("./obrazki/magazynek.png");
const mapJPG = require("./obrazki/test.jpg");
const cursor = require("./obrazki/celownik.png");

const socket = io.connect('http://192.168.1.6:3000/');

window.onload = function () {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.style.cursor = "none";
    const ctx = canvas.getContext('2d');

    const startImage = new Image();
    startImage.src = startImageJPG;

    const startImage2 = new Image();
    startImage2.src = startImageJPG2;

    const map = new Map(mapJPG);

    const mouse = new Cursor(cursor);

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
            socket.emit('CreatePlayer', newPlayer);
            return newPlayer;
        } else {
            registerUser(data)
        }
    }

    socket.on('HelloPlayer', function (data) {
        console.log(data);
        const newPlayer = registerUser(data);
        alert(newPlayer.name + ' joined the game!');
        const loop = new Loop(socket, newPlayer, canvas, ctx, mouse, startImage, map);
        loop.run();
    });

};