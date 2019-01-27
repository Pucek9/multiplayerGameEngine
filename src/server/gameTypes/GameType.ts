import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewPlayer from '../../shared/apiModels/NewPlayer';

export default interface GameType {

    generateId();

    getPlayer(id);

    activePlayers();

    getPlayers();

    getBullets();

    getMapName();

    getStaticObjects();

    updateBullets();

    detectBulletsCollision();

    addBullet(mouseClick: MouseCoordinates);

    setPlayerActive(id: number);

    connectPlayer(id: number, newPlayer: NewPlayer);

    disconnectPlayer(disconnected);

    setKeys(id, keys);

    move(id);

    updatePlayerDirection(mouseCoordinates: MouseCoordinates);

}
