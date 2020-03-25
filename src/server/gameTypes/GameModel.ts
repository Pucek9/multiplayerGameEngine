import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewUser from '../../shared/apiModels/NewUser';
import Team from '../../shared/models/Team';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import Cursor from '../services/Cursor/Cursor';
import Emitter from '../services/Emitter';
import GameMap from '../services/Maps/GameMap';
import Steering from '../services/Steering/Steering';

export default abstract class GameModel {
  steering: Steering;
  cursor: Cursor;
  emitter: Emitter;
  map: GameMap;
  roomName: string;
  type: string;
  camera: string;
  light: string;
  botsCount: number;
  players: Player[];
  bullets: Bullet[];
  ip: string;
  teams?: Team[];
  friendlyFire?: boolean;

  abstract getPlayer(id: string);

  abstract getAlivePlayers();

  abstract getPlayers();

  abstract getNormalizedBullets();

  abstract getMapName();

  abstract getStaticObjects();

  abstract updateBullets();

  abstract detectBulletsCollision();

  abstract shoot(id: string);

  abstract revivePlayer(id: string);

  abstract connectPlayer(newPlayer: NewUser);

  abstract disconnectPlayer(disconnected: Player);

  abstract updateKeys(id: string, keys: Array<string>);

  abstract performKeysOperation(player: Player);

  abstract performKeysOperationForPlayers();

  abstract updateCursor(mouseCoordinates: MouseCoordinates);

  abstract mouseClick(id: string);

  abstract mouseRightClick(id: string);

  abstract mouseUp(id: string);

  abstract generateBullets(bullets: Bullet[]);
  abstract detectPlayerCollisionWithObjects(player: Player);
}
