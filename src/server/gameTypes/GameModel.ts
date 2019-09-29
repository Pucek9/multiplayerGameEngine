import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import Bullet from '../models/Bullet';
import GameMap from '../maps/GameMap';

export default interface GameModel {
  steering;
  emitter;
  roomName: string;
  type: string;
  map: GameMap;
  players: Player[];
  bullets: Bullet[];

  getPlayer(id: string);

  alivePlayers();

  getPlayers();

  isPlayerInThisGame(id: string);

  getBullets();

  getMapName();

  getStaticObjects();

  updateBullets();

  detectBulletsCollision();

  shoot(mouseClick: MouseCoordinates);

  revivePlayer(id: string);

  connectPlayer(id: string, newPlayer: NewUser);

  disconnectPlayer(disconnected: Player);

  updateKeys(id: string, keys: Array<string>);

  performKeysOperation(player: Player);

  performKeysOperationForPlayers();

  updatePlayerDirection(mouseCoordinates: MouseCoordinates);

  mouseClick(mouseClick: MouseCoordinates);

  mouseUp(mouseClick: MouseCoordinates);

  generateBullets(bullets: Bullet[]);
}
