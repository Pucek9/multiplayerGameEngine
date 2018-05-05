//const Mouse = require('../../objects/Pointer.js');
import {Mouse} from '../../../objects/Pointer.js';
import {Loop} from '../../Loop.js'
import startImageJPG from "./obrazki/start.jpg";
import io from 'socket.io-client';
import startImageJPG2 from "./obrazki/magazynek.png";
// import mapJPG from "./obrazki/mapa1.png";
import cursor from "./obrazki/celownik.png";
import Player from "../../../objects/Player";

const socket = io.connect('http://localhost:3000/');

window.onload = function () {
    const canvas = document.getElementById("canvas");

    function randX() {
        return Math.floor((Math.random() * canvas.width / 2) + 1);
    }

    function randY() {
        return Math.floor((Math.random() * canvas.height / 2) + 1);
    }

    function randRGB() {
        return Math.floor(Math.random() * 255);
    }

    function randColor() {
        return `rgb(${randRGB()},${randRGB()},${randRGB()})`;
    }

    function registerUser(data) {
        let name = prompt("Please enter your name", "Player");
        if (name !== null) {
            alert(name + ' joined the game!');
            const player = new Player(data.socketId, name, randColor(), randX(), randY());
            socket.emit('CreatePlayer', player);
            return player;
        } else {
            registerUser(data)
        }
    }

    // canvas.onmousedown = function (e) {
    //     e.preventDefault();
    // };
    canvas.style.cursor = "none";
    var ctx = canvas.getContext('2d');

    var startImage = new Image();
    startImage.src = startImageJPG;

    var startImage2 = new Image();
    startImage2.src = startImageJPG2;

    // var map = new Image();
    // map.src = mapJPG;

    var mouse = new Mouse(cursor);


    socket.emit('connection');
    socket.on('HelloPlayer', function (data) {
        console.log(data);
        const user = registerUser(data);
        const loop = new Loop(socket, user, canvas, ctx, startImage, mouse);
        loop.run();
    });

};