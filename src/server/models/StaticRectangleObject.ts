import StaticRectangleObjectModel from '../../shared/models/StaticRectangleObjectModel';
import { Angle } from '../services/CollisionDetector';
import Bullet from './Bullet';

export default class StaticRectangleObject extends StaticRectangleObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
