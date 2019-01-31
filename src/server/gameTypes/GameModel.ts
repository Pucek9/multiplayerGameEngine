import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import Player from '../models/Player';
import Bullet from '../models/Bullet';
import GameMap from '../maps/GameMap';

export default interface GameModel {
  name: string;
  type: string;
  map: GameMap;
  players: Player[];
  bullets: Bullet[];

  generateId();

  getPlayer(id: string);

  activePlayers();

  getPlayers();

  isPlayerInThisGame(id: string);

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
