import { PISTOL } from '../../../shared/constants';

import Weapon from './Weapon';

export default class Pistol extends Weapon {
  type = PISTOL;
  magazines = 5;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 200;
  reloadTime = 1500;
  shootBulletsCount = 1;
  bulletConfig = {
    type: PISTOL,
    size: 3,
    power: 20,
    range: 700,
  };

  constructor(params?: Partial<Pistol>) {
    super();
    Object.assign(this, params);
  }
}
