import ShootPower from './ShootPower';
import { Angle } from '../../services/CollisionDetector';

export default class Push extends ShootPower {
  type = 'Push';
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    color: 'white',
    size: 50,
    range: 400,
    power: 0,
    hit(angle: Angle) {},
  };
}
