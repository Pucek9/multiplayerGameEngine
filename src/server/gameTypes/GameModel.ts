import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import NewPlayer from '../../shared/apiModels/NewPlayer';
import Player from '../models/Player';
import Bullet from '../models/Bullet';
import GameMap from '../maps/GameMap';

export default interface GameModel {
  main;
  name: string;
  type: string;
  map: GameMap;
  players: Player[];
  bullets: Bullet[];

  generateId();

  getPlayer(id: string);

  alivePlayers();

  getPlayers();

  isPlayerInThisGame(id: string);

  getBullets();

  getMapName();

  getStaticObjects();

  updateBullets();

  detectBulletsCollision();

  addBullet(mouseClick: MouseCoordinates);

  revivePlayer(id: string);

  connectPlayer(id: string, newPlayer: NewPlayer);

  disconnectPlayer(disconnected: Player);

  updateKeys(id: string, keys: Array<string>);

  updatePlayerPosition(player: Player);

  updatePlayersPosition();

  updatePlayerDirection(mouseCoordinates: MouseCoordinates);

  isPlayerAlive(id: string);

  mouseClick(mouseClick: MouseCoordinates);
}
