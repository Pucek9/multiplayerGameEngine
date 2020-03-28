import ShootPower from './ShootPower';

export default abstract class Aura extends ShootPower {
  bulletId = null;
  abstract isActive(): boolean;

  generateBullets(bullets, game, owner) {
    super.generateBullets(bullets, game, owner);
    if (bullets.length > 0) {
      this.bulletId = bullets[0].id;
    } else {
      this.bulletId = null;
    }
  }
}
