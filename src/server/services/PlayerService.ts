import { CIRCLE } from '../../shared/constants/other';
import { rand } from '../../shared/helpers';

import Zone from '../models/Zone';
import collisionDetector from './CollisionDetector';

export class PlayerService {
  randNonCollisionPosition(
    size: number,
    gameState,
    zoneX,
    zoneWidth,
    zoneY,
    zoneHeight,
  ): { x: number; y: number } {
    const allObjects = [...gameState.getStaticObjects(), ...gameState.getAlivePlayers()];
    let x,
      y,
      collision = true;
    do {
      [x, y] = [rand(zoneWidth, zoneX), rand(zoneHeight, zoneY)];
      collision = collisionDetector.detectObjectCollisionWithOtherObjects(
        { x, y, size, shape: CIRCLE, direction: { dx: 0, dy: 0 }, speed: 0 },
        allObjects,
      );
    } while (collision !== false);
    return { x, y };
  }

  randNonCollisionPositionForMap(size: number, gameState): { x: number; y: number } {
    const [width, height] = [gameState.map.width / 2, gameState.map.height / 2];
    return this.randNonCollisionPosition(size, gameState, -width, width, -height, height);
  }

  randNonCollisionPositionForZone(size: number, gameState, zone: Zone): { x: number; y: number } {
    return this.randNonCollisionPosition(
      size,
      gameState,
      zone.x,
      zone.x + zone.width,
      zone.y,
      zone.y + zone.height,
    );
  }
}

const playerService = new PlayerService();
export default playerService;
