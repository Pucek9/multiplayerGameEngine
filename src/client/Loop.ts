import NewBullet from "../api/NewBullet";
import PlayerModel from "../api/PlayerModel";
import Player from "./models/Player";
import ActivePlayer from "./models/ActivePlayer";
import Bullet from "./models/Bullet";
import PlayerList from "./models/PlayersList";
import Cleaner from "./models/Cleaner";


// var magazyn = window.localStorage;
// var sounds = magazyn.getItem("snd") === "true";

const config = {
    menu: false,
    fps: 50,
};

let players = [];
let bullets = [];

function Loop(socket, user, screen, cursor, menu, map) {
    const that = this;
    let activePlayer;
    const playersList = new PlayerList(screen);
    const cleaner = new Cleaner(screen);

    socket.on('getPlayers', function (_players: PlayerModel[]) {
        players = _players;
        activePlayer = players.find(_player => _player.id === user.id);
        players.forEach(_player => {
            if (_player.id !== user.id) {
                Object.setPrototypeOf(_player, Player.prototype);
            } else {
                Object.setPrototypeOf(_player, ActivePlayer.prototype);
            }
            _player.screen = screen;
        });
    });

    socket.on('getBullets', function (_bullets: Bullet[]) {
        bullets = _bullets;
        bullets.forEach(bullet => {
            Object.setPrototypeOf(bullet, Bullet.prototype);
            bullet.screen = screen;
        })
    });

    screen.canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (config.menu === false) {
            config.menu = true;
            socket.emit('activePlayer');
        } else {
            const newBullet = new NewBullet(
                activePlayer.x + cursor.x - screen.canvas.width / 2,
                activePlayer.y + cursor.y - screen.canvas.height / 2,
                user.id
            );
            socket.emit('pushBullet', newBullet);
        }

    });

    screen.canvas.addEventListener('mouseup', function (e) {
        e.preventDefault();
    });

    screen.canvas.addEventListener("mousemove", function mouseMove(e) {
        if (e.pageX) {
            cursor.x = e.pageX;
        }
        else if (e.clientX) {
            cursor.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        }
        cursor.x = cursor.x - screen.canvas.offsetLeft;
        if (e.pageY) {
            cursor.y = e.pageY;
        }
        else if (e.clientY) {
            cursor.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        cursor.y = cursor.y - screen.canvas.offsetTop;
    }, false);

    window.addEventListener('keydown', function (e) {
        e.preventDefault();
        socket.emit('keydown', e.key)
    });

    this.run = function () {
        cleaner.render();
        socket.emit('iteration');
        if (config.menu && activePlayer && map) {
            map.render(activePlayer);
            players.forEach(player => player.render(activePlayer));
            bullets.forEach(bullet => bullet.render(activePlayer));
        } else {
            menu.render();
        }
        playersList.render(players);
        cursor.render();

        setTimeout(that.run, 1000 / config.fps);
    }
};

export default Loop;