import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
// import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId } from '../../../shared/helpers';

export default class Pistol implements Weapon {
  type: string;
  owner;//: PlayerModel;
  constructor() {}
  shoot(mouseClick: MouseCoordinates, owner): Bullet[] {
    const bullet = new Bullet(
      generateId(),
      owner,
      owner.x + owner.size / 4,
      owner.y + owner.size / 4,
      mouseClick.targetX,
      mouseClick.targetY,
      2,
    );
    return [bullet];
  }

  // setOwner(owner) {
  //   this.owner = owner;
  // }
}
