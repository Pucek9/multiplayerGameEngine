import Player from './Player';
import { randItem } from '../../shared/helpers';
import Weapon from './weapons/Weapon';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';

export default class Bot extends Player {
  die() {
    super.die();
    this.keys.clear();
  }

  updateCursor(target: { x: number; y: number }) {
    this.cursor.x = target.x;
    this.cursor.y = target.y;
  }

  performRandKeys() {
    const keys = [['W'], ['A'], ['S'], ['D']];
    this.keys.clear();
    if (this.isAlive()) {
      const keysCombinations = [...keys, ['W', 'A'], ['A', 'S'], ['S', 'D'], ['D', 'W']];
      const newKeys = randItem<Array<string>>(keysCombinations);
      newKeys.push(randItem<string>([...this.getAvailableWeaponsIndex(), '']));
      newKeys.push(randItem<string>(['Shift', '']));
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
