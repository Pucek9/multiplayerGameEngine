var magazyn = window.localStorage;
// var sounds = magazyn.getItem("snd") === "true";

var config = {
    flaga: false,
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

let players = [];

function Loop(socket, user, canvas, ctx, mouse, startImage, map) {
    const that = this;

    socket.on('getPlayers', function (_players) {
        players = _players;
    });

    this.renderMap = function (activePlayer, map) {
        ctx.drawImage(map, 0 - activePlayer.x, 0 - activePlayer.y);
    };

    this.renderPlayer = function (player) {
        ctx.fillStyle = player.color;
        ctx.fillRect(canvas.width / 2, canvas.height / 2, 50, 50)
    };

    this.renderEnemy = function (activePlayer, player) {
        ctx.fillStyle = player.color;
        ctx.fillRect(canvas.width / 2 - (activePlayer.x - player.x), canvas.height / 2 - (activePlayer.y - player.y), 50, 50)
        ctx.font = '10pt Arial';
        ctx.lineWitdh = 1;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, canvas.width / 2 - (activePlayer.x - player.x) + 25, canvas.height / 2 - (activePlayer.y - player.y) - 5);
    };

    this.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };



    this.render = function () {
        const activePlayer = players.find(player => player.id === user.id);
        that.renderMap(activePlayer, map);
        players.filter(player => player.id !== user.id)
            .forEach(player => that.renderEnemy(activePlayer, player));
        that.renderPlayer(activePlayer);
        that.renderListOfPlayers()
    };

    this.renderListOfPlayers = function () {
        ctx.font = '10pt Arial';
        ctx.lineWitdh = 1;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText('Active players:', 10, 15);
        players.forEach((player, i) => {
            ctx.fillStyle = player.color;
            ctx.fillText(`${player.name}: ${player.score}`, 10, 30 + i * 15);
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
        if (config.flaga === false) {
            config.flaga = true;
            socket.emit('activePlayer');
        } else {
            //shoot
        }
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

        if (config.flaga) {
            that.render()
        } else {
            // console.log('menu');
            that.renderMenu()
        }

        that.renderCursor();
        setTimeout(that.run, 1000 / config.fps);
    }
};

export {Loop};