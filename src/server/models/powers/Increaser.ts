import ShootPower from './ShootPower';

export default class Increaser extends ShootPower {
  type = 'Increaser';
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    color: 'white',
    size: 5,
    range: 700,
    power: 1,
    effectOnPlayer(player) {
      player.size += 2;
      if (player.hp > 0.5) {
        player.speed -= 0.5;
      }
    },
    additionalAction() {
      this.size += 0.1;
      if (this.customFlag) {
        this.increaseSpeedToDefault();
      }
    },
  };
}
