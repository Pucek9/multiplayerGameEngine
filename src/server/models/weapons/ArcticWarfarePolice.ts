import { AWP } from '../../../shared/constants';

import Weapon from './Weapon';

export default class ArcticWarfarePolice extends Weapon {
  type = AWP;
  magazines = 5;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 1000;
  reloadTime = 1500;
  shootBulletsCount = 1;
  offset = -0.25;
  bulletConfig = {
    type: AWP,
    size: 4,
    power: 90,
    range: 2000,
    defaultSpeed: 100,
    speed: 100,
  };

  constructor(params?: Partial<ArcticWarfarePolice>) {
    super();
    Object.assign(this, params);
  }
}
