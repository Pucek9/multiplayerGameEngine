import { StaticRectangleObjectModel } from '../../shared/models';

import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class StaticRectangleObject extends StaticRectangleObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
