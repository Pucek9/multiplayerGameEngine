import * as constants from '../shared/constants.json';
import GameState from './GameState'

const API = (<any>constants).API;

const config = {
    menu: false,
    fps: 100,
};

function Loop(socket, user, screen) {

    const that = this;
    const gameState = new GameState(user, screen);

    socket.on(API.ADD_NEW_PLAYER, gameState.appendNewPlayer.bind(gameState));

    socket.on(API.ADD_PLAYERS,gameState.appendPlayers.bind(gameState));

    socket.on(API.ADD_NEW_BULLET,gameState.appendNewBullet.bind(gameState));

    socket.on(API.GET_PLAYERS_STATE, gameState.updatePlayersState.bind(gameState));

    socket.on(API.GET_BULLETS, gameState.updateBulletsState.bind(gameState));

    socket.on(API.GET_STATIC_OBJECTS, gameState.appendStaticObjects.bind(gameState));

    socket.on(API.DISCONNECT_PLAYER, gameState.removePlayer.bind(gameState));

    window.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (config.menu === false) {
            config.menu = true;
            socket.emit(API.ACTIVATE_PLAYER);
        } else {
            const mouseClick = gameState.getMouseCoordinates();
            socket.emit(API.MOUSE_CLICK, mouseClick);
        }
    });

    window.addEventListener("mousemove", function mouseMove(e: MouseEvent) {
        const mouseCoordinates = gameState.getUpdatedMouseCoordinates(e);
        if(mouseCoordinates) {
            socket.emit(API.UPDATE_DIRECTION, mouseCoordinates);
        }
    }, false);

    window.addEventListener('keydown', function (e : KeyboardEvent) {
        e.preventDefault();
        if (!e.repeat) {
            gameState.addKey(e);
            socket.emit(API.UPDATE_KEYS, [...gameState.keys])
        }
    });

    window.addEventListener('keyup', function (e: KeyboardEvent) {
        e.preventDefault();
        gameState.deleteKey(e);
        socket.emit(API.UPDATE_KEYS, [...gameState.keys])
    });


    window.addEventListener("wheel", function (e: WheelEvent) {
        e.preventDefault();
        gameState.wheel(e);
    });

    this.run = function () {
        gameState.tryRenderEverything();
        screen.renderer.render(screen.scene, screen.camera);
        requestAnimationFrame(that.run);

        const playersList = gameState.players.map(player => ({name: player.name, score: player.score, color:player.color, hp: player.hp}));
        const _playersListString = JSON.stringify(playersList);
        if(_playersListString !== gameState.playersListString) {
            gameState.playersListComponent.render(playersList);
            gameState.playersListString = _playersListString;
        }

    }


}

export default Loop;
