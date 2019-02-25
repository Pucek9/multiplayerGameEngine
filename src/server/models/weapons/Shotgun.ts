import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId, rand } from '../../../shared/helpers';

const DISPERSION = 70;

export default class Shotgun implements Weapon {
  type = 'Shotgun';
  constructor() {}
  shoot(mouseClick: MouseCoordinates, owner: PlayerModel): Bullet[] {
    const basicsInfo = [owner, owner.x + owner.size / 4, owner.y + owner.size / 4];
    return [
      // @ts-ignore
      new Bullet(generateId(), ...basicsInfo, mouseClick.targetX, mouseClick.targetY, 2),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX + rand(DISPERSION),
        mouseClick.targetY + rand(DISPERSION),
        2,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX - rand(DISPERSION),
        mouseClick.targetY + rand(DISPERSION),
        2,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX - rand(DISPERSION),
        mouseClick.targetY - rand(DISPERSION),
        2,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX + rand(DISPERSION),
        mouseClick.targetY - rand(DISPERSION),
        2,
      ),
    ];
  }
}
