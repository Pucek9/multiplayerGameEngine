import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import Bullet from './Bullet';
import { Angle } from '../services/CollisionDetector';

export default class StaticCircularObject extends StaticCircularObjectModel {
  hitFromBullet(bullet: Bullet, angle?: Angle) {}
}
