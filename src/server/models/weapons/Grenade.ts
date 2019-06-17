import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import gamesManager from '../../services/GamesManager';
import Shotgun from './Shotgun';

export default class Grenade extends Weapon {
  type = 'Grenade';
  magazines = 1;
  maxBulletsInMagazine = 5;
  bulletsInMagazine = 5;
  minTimeBetweenBullets = 500;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig: Partial<Bullet> = {
    color: 'white',
    size: 5,
    power: 1,
    range: 400,
    speed: 7,
    minSpeed: 0.1,
    hit(angle?: { x: number; y: number }) {
      if (angle) {
        this.reverseX *= angle.x;
        this.reverseY *= angle.y;
      }
      this.decreaseSpeed(1);
    },
    additionalAction() {
      this.decreaseSpeed(0.05);
      if (this.speed === this.minSpeed) {
        this.deactivate();
      }
    },
    deactivate() {
      const game = gamesManager.getGame(this.gameName);
      if (game) {
        const shotgun = new Shotgun();
        game.generateBullets(
          shotgun.generateBullets(
            { targetX: this.x, targetY: this.y, owner: null },
            { x: this.x, y: this.y, size: this.size },
          ),
        );
      }
      this.active = false;
    },
  };

  constructor() {
    super();
  }

  generateBullets(mouseClick: MouseCoordinates, owner: Partial<PlayerModel>) {
    return [
      new Bullet({
        owner,
        fromX: owner.x + owner.size / 4,
        fromY: owner.y + owner.size / 4,
        targetX: mouseClick.targetX,
        targetY: mouseClick.targetY,
        gameName: this.gameName,
        ...this.bulletConfig,
      }),
    ];
  }
}
