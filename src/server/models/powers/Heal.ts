import ShootPower from './ShootPower';
import { HEAL } from "../../../shared/constants/powers";

export default class Heal extends ShootPower {
  type = HEAL;
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    type: HEAL,
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
