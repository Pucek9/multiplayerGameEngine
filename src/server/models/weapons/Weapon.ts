import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';

export default interface Weapon {
  type: string;
  shoot(mouseCoordinates: MouseCoordinates, player): Bullet[];
  // setOwner(owner: PlayerModel);
}
