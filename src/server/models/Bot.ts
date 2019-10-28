import Player from './Player';
import { randItem } from '../../shared/helpers';
import Weapon from './weapons/Weapon';

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
      const keysCombinations = [...keys, ['W', 'A'], ['A', 'S'], ['S', 'D'], ['D', 'W']];
      const newKeys = randItem<Array<string>>(keysCombinations);
      newKeys.push(randItem<string>([...this.getAvailableWeapons(), '']));
      newKeys.push(randItem<string>(['Shift', '']));
      newKeys.forEach(key => this.keys.add(key));
    }
  }

  getAvailableWeapons() {
    return this.weapons
      .map((weapon: Weapon, index) => ({
        [index]:
          (weapon.magazines !== Infinity && weapon.magazines > 0) || weapon.bulletsInMagazine > 0,
      }))
      .filter((position, index) => position[index])
      .map((position, index) => (index + 1).toString());
  }
}
