import { randItem } from '../../shared/helpers';

import Player from './Player';
import Weapon from './weapons/Weapon';

export default class Bot extends Player {
  die(params) {
    super.die(params);
    this.keys.clear();
    this.direction = { dx: 0, dy: 0 };
  }

  performRandKeys() {
    const keys = [['W'], ['A'], ['S'], ['D']];
    this.keys.clear();
    if (this.isAlive()) {
      const keysCombinations = [...keys, ['W', 'A'], ['A', 'S'], ['S', 'D'], ['D', 'W']];
      const newKeys = randItem<Array<string>>(keysCombinations);
      newKeys.push(
        randItem<string>([...this.getAvailableWeaponsIndex(), '']),
      );
      newKeys.push(
        randItem<string>(['Shift', '']),
      );
      newKeys.forEach(key => this.keys.add(key));
    }
  }

  getAvailableWeaponsIndex(): Array<string> {
    return this.weapons
      .map((weapon: Weapon, index) => ({
        [index]:
          (weapon.magazines !== Infinity && weapon.magazines > 0) || weapon.bulletsInMagazine > 0,
      }))
      .filter((position, index) => position[index])
      .map((position, index) => (index + 1).toString());
  }
}
