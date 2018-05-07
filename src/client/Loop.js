import Bullet from "../objects/Bullet";
import Player from "../objects/Player";

var magazyn = window.localStorage;
// var sounds = magazyn.getItem("snd") === "true";

var config = {
    menu: false,
    x: canvas.width / 2,
    y: canvas.height / 2,
    skok: 3,
    s: 0,
    fps: 50,
    obrot: 0.2,
    mouseBut: false,
    przeladuj: false,
    shooting: null,
    d: canvas.width / 2 - 40, //dystans z jakiego widza nas wrogowie
};

let mouseBut = false;

let players = [];
let bullets = [];

function Loop(socket, user, canvas, ctx, mouse, startImage, map) {
    const that = this;
    const player = user;
    let activePlayer;
    socket.on('getPlayers', function (_players) {
        players = _players;
        activePlayer = players.find(_player => _player.id === player.id);
        if (activePlayer) {
            Object.setPrototypeOf(activePlayer, Player.prototype);
        }
    });

    socket.on('getBullets', function (_bullets) {
        bullets = _bullets;
    });

    this.renderMap = function (map) {
        ctx.drawImage(map, 0 - activePlayer.x, 0 - activePlayer.y);
    };

    this.renderPlayer = function () {
        ctx.fillStyle = activePlayer.color;
        ctx.fillRect(canvas.width / 2, canvas.height / 2, 50, 50)
    };

    this.renderEnemy = function (enemy) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(canvas.width / 2 - (activePlayer.x - enemy.x), canvas.height / 2 - (activePlayer.y - enemy.y), 50, 50);
        ctx.font = '10pt Arial';
        ctx.lineWitdh = 1;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.name, canvas.width / 2 - (activePlayer.x - enemy.x) + 25, canvas.height / 2 - (activePlayer.y - enemy.y) - 5);
    };

    this.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.renderBullet = function (bullet) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2 - (activePlayer.x - bullet.actualX), canvas.height / 2 - (activePlayer.y - bullet.actualY), 2, 0, 2 * Math.PI);
        // ctx.arc(bullet.actualX, bullet.actualY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    };

    this.renderBullets = function () {
        bullets.forEach(bullet => {
            Object.setPrototypeOf(bullet, Bullet.prototype);
            that.renderBullet(bullet);
        })
    };

    this.render = function () {
        if (player) {
            that.renderMap(map);
            players.filter(_player => _player.id !== player.id)
                .forEach(enemy => that.renderEnemy(enemy));
            that.renderPlayer();
            that.renderBullets();

        }
        that.renderListOfPlayers()
    };

    this.renderListOfPlayers = function () {
        ctx.font = '10pt Arial';
        ctx.lineWitdh = 1;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText('Active players:', 10, 15);
        players.forEach((_player, i) => {
            ctx.fillStyle = _player.color;
            ctx.fillText(`${_player.name}: ${_player.score}`, 10, 30 + i * 15);
        });
    };

    this.renderCursor = function () {
        ctx.drawImage(mouse.img, mouse.x - mouse.img.width / 2, mouse.y - mouse.img.height / 2);
    };

    this.renderMenu = function () {
        ctx.drawImage(startImage, 0, 0)
    };

    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (config.menu === false) {
            config.menu = true;
            socket.emit('activePlayer');
        } else {
            // const bullet = new Bullet(canvas.width / 2, canvas.height / 2, mouse.x - mouse.img.width / 2, mouse.y - mouse.img.height / 2, user.id);
            const bullet = new Bullet(
                activePlayer.x,
                activePlayer.y,
                activePlayer.x + mouse.x,
                activePlayer.y + mouse.y,
                player.id);
            socket.emit('pushBullet', bullet);
        }

    });

    canvas.addEventListener('mouseup', function (e) {
        e.preventDefault();
        mouseBut = false;
    });

    canvas.addEventListener("mousemove", function mouseMove(e) {
        if (e.pageX) {
            mouse.x = e.pageX;
        }
        else if (e.clientX) {
            mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        }
        mouse.x = mouse.x - canvas.offsetLeft;
        if (e.pageY) {
            mouse.y = e.pageY;
        }
        else if (e.clientY) {
            mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        mouse.y = mouse.y - canvas.offsetTop;
    }, false);

    window.addEventListener('keydown', function (e) {
        e.preventDefault();
        socket.emit('keydown', e.key)
    });

    this.run = function () {
        that.clear();
        socket.emit('iteration');
        if (config.menu) {
            that.render();
        } else {
            that.renderMenu()
        }

        that.renderCursor();
        setTimeout(that.run, 1000 / config.fps);
    }
};

export {Loop};