import ShootPower from './ShootPower';

export default class Heal extends ShootPower {
  type = 'Heal';
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    type: 'Heal',
    color: 'red',
    size: 10,
    speed: 20,
    range: 300,
    power: 0,
    effectOnPlayer(player) {
      player.takeAidKit({ hp: 10, speed: true, size: true });
    },
  };
}
