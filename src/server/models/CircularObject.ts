import { CircularObjectModel } from '../../shared/models';

import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class CircularObject extends CircularObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
