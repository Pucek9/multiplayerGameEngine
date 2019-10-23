import Player from './Player';
import collisionDetector from '../services/CollisionDetector';
import { randItem } from '../../shared/helpers';

export default class Bot extends Player {
  die() {
    super.die();
    this.keys.clear();
  }

  updateCursor(target) {
    this.cursor.x = target.x;
    this.cursor.y = target.y;
  }

  performRandKeys() {
    const keys = [['W'], ['A'], ['S'], ['D']];
    this.keys.clear();
    if (this.isAlive()) {
      const keysCombinations = [...keys, ['W', 'A'], ['A', 'S'], ['S', 'D'], ['D', 'W'], ['1']];
      const newKeys = randItem(keysCombinations);
      newKeys.push(randItem(['Shift', '']));
      newKeys.forEach(key => this.keys.add(key));
    }
  }
}
