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
}

var players;

function Loop(socket, player, canvas, ctx, startImage, mouse) {
    const that = this;

    this.renderPlayer = function (player) {
        console.log('player', player);
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, 50, 50)
    };

    this.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    socket.on('getPlayers', function (_players) {
        console.log('players', _players);
        players = _players;
    });

    this.render = function () {
        console.log('game');
        players.forEach(player => that.renderPlayer(player))
    };

    this.renderCursor = function () {
        ctx.drawImage(mouse.img, mouse.x - mouse.img.width / 2, mouse.y - mouse.img.height / 2);
    };

    this.renderMenu = function () {
        ctx.drawImage(startImage, 0, 0)
    };

    canvas.addEventListener('mousedown', function (e) {
        if (config.flaga === false)       {
            config.flaga = true;
            socket.emit('activePlayer');
            console.log('start')
        } else {
            console.log('shoot')
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
        socket.emit('keydown', e.key)
    });

    this.run = function () {
        that.clear();

        if (config.flaga) {
            that.render()
        } else {
            console.log('menu');
            that.renderMenu()
        }

        that.renderCursor();
        setTimeout(that.run, 1000 / config.fps);
    }
};

export {Loop};