import { StaticCircularObjectModel } from '../../shared/models';

import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class StaticCircularObject extends StaticCircularObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
