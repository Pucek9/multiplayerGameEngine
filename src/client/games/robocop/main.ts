import NewPlayer from "../../../api/models/NewPlayer";
import Player from "../../../server/models/Player";
import Cursor from '../../models/Cursor';
import Map from '../../models/Map';
import Loop from '../../Loop'
import Menu from "../../models/Menu";

const io = require('socket.io-client');
const startImageJPG = require("./obrazki/start.jpg");
const mapJPG = require("./obrazki/test.jpg");
const cursorPNG = require("./obrazki/celownik.png");

const socket = io.connect('http://192.168.1.6:3000/');

window.onload = function () {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.style.cursor = "none";
    const ctx = canvas.getContext('2d');
    const screen = {ctx: ctx, canvas: canvas};

    const map = new Map(mapJPG, screen);
    const menu = new Menu(startImageJPG, screen);
    const cursor = new Cursor(cursorPNG, screen);

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
        const loop = new Loop(socket, newPlayer, screen, cursor, menu, map);
        loop.run();
    });

};