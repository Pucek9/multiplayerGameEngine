import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import Bullet from '../models/Bullet';
import GameMap from '../maps/GameMap';
import Steering from "../services/Steering/Steering";
import Cursor from "../services/Cursor/Cursor";
import Emitter from "../services/Emitter";

export default interface GameModel {
  steering: Steering;
  cursor : Cursor;
  emitter: Emitter;
  roomName: string;
  type: string;
  camera: string;
  light: string;
  map: GameMap;
  botsCount: number;
  players: Player[];
  bullets: Bullet[];

  getPlayer(id: string);

  getAlivePlayers();

  getPlayers();

  isPlayerInThisGame(id: string);

  getBullets();

  getMapName();

  getStaticObjects();

  updateBullets();

  detectBulletsCollision();

  shoot(id: string);

  revivePlayer(id: string);

  connectPlayer(newPlayer: NewUser);

  disconnectPlayer(disconnected: Player);

  updateKeys(id: string, keys: Array<string>);

  performKeysOperation(player: Player);

  performKeysOperationForPlayers();

  updateCursor(mouseCoordinates: MouseCoordinates);

  mouseClick(id: string);

  mouseUp(id: string);

  generateBullets(bullets: Bullet[]);
}
