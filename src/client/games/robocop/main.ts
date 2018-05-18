const io = require('socket.io-client');
import Player from "../../../objects/Player";
import {Mouse} from '../../../objects/Pointer';
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

    const map = new Image();
    map.src = mapJPG;

    const mouse = new Mouse(cursor);

    function randX() {
        return Math.floor((Math.random() * map.width / 3) + 1);
    }

    function randY() {
        return Math.floor((Math.random() * map.height / 3) + 1);
    }

    function randRGB() {
        return Math.floor(Math.random() * 255);
    }

    function randColor() {
        return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
    }

    function registerUser(data) {
        let name = prompt("Please enter your name", "Player");
        if (!(name === null || name === '')) {
            const player = new Player(data.socketId, name, randColor(), randX(), randY(), 50);
            socket.emit('CreatePlayer', player);
            return player;
        } else {
            registerUser(data)
        }
    }

    socket.on('HelloPlayer', function (data) {
        console.log(data);
        const user = registerUser(data);
        alert(user.name + ' joined the game!');
        const loop = new Loop(socket, user, canvas, ctx, mouse, startImage, map);
        loop.run();
    });

};