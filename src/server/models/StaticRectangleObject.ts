import StaticRectangleObjectModel from '../../shared/models/StaticRectangleObjectModel';
import Bullet from './Bullet';
import { Angle } from '../services/CollisionDetector';

export default class StaticRectangleObject extends StaticRectangleObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
