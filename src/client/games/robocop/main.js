
import {Mouse} from '../../../objects/Pointer.js';
import {Loop} from '../../Loop.js'
import startImageJPG from "./obrazki/start.jpg";
import io from 'socket.io-client';
import startImageJPG2 from "./obrazki/magazynek.png";
import mapJPG from "./obrazki/test.jpg";
import cursor from "./obrazki/celownik.png";
import Player from "../../../objects/Player";

const socket = io.connect('http://192.168.1.6:3000/');

window.onload = function () {
    const canvas = document.getElementById("canvas");
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
        return Math.floor((Math.random() * map.width) + 1);
    }

    function randY() {
        return Math.floor((Math.random() * map.height) + 1);
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