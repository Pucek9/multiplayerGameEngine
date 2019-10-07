import collisionDetector from './CollisionDetector';
import { rand } from '../../shared/helpers';

export class PlayerService {
  randNonCollisionPosition(size: number, gameState): { x: number; y: number } {
    const allObjects = [...gameState.getStaticObjects(), ...gameState.getAlivePlayers()];
    const [width, height] = [gameState.map.width / 2, gameState.map.height / 2];
    let x,
      y,
      collision = true;
    do {
      [x, y] = [rand(width, -width), rand(height, -height)];
      collision = collisionDetector.detectObjectCollisionWithOtherObjects(
        { x, y, size, shape: 'circle' },
        allObjects,
      );
    } while (collision !== false);
    return { x, y };
  }
}
const playerService = new PlayerService();
export default playerService;
