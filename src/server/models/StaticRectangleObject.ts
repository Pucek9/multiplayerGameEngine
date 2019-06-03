import StaticRectangleObjectModel from '../../shared/models/StaticRectangleObjectModel';
import Bullet from './Bullet';

export default class StaticRectangleObject extends StaticRectangleObjectModel {
  hitFromBullet(bullet: Bullet) {
    bullet.hit();
  }
}
