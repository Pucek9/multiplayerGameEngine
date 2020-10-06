import { RectangleObjectModel } from '../../shared/models';

import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class RectangleObject extends RectangleObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
