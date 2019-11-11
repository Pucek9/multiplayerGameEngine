import Knife from './Knife';

export default class Legs extends Knife {
  type = 'Legs';
  magazines = Infinity;
  maxBulletsInMagazine = Infinity;
  bulletsInMagazine = Infinity;
  minTimeBetweenBullets = 0;
  reloadTime = 0;
  shootBulletsCount = 1;
  bulletConfig = {
    flash: false,
    size: 8,
    power: 0,
    range: 40,
    allowForManipulate: false,
    speed: 3,
  };
}
