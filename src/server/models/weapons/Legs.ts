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
    type: 'Legs',
    flash: false,
    size: 20,
    power: 0,
    range: 30,
    speed: 1,
    allowForManipulate: false,
    hit(angle?: { x: number; y: number }, object?) {
      this.deactivate();
    },
  };
}
