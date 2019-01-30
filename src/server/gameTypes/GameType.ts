import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import Player from '../models/Player';

export default interface GameType {
  generateId();

  getPlayer(id: string);

  activePlayers();

  getPlayers();

  getBullets();

  getMapName();

  getStaticObjects();

  updateBullets();

  detectBulletsCollision();

  addBullet(mouseClick: MouseCoordinates);

  setPlayerActive(id: string);

  connectPlayer(id: string, newPlayer: NewPlayer);

  disconnectPlayer(disconnected: Player);

  setKeys(id: string, keys: Array<string>);

  move(id: string);

  updatePlayerDirection(mouseCoordinates: MouseCoordinates);
}
