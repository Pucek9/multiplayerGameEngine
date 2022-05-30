import { CommonObjectModel } from '../../shared/models';

import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class RectangleObject extends CommonObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
