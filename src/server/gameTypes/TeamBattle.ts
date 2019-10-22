import collisionDetector from '../services/CollisionDetector';
import Player from '../models/Player';
import Aura from '../models/powers/Aura';
import StaticRectangleObject from '../models/StaticRectangleObject';
import StaticCircularObject from '../models/StaticCircularObject';
import Free4all from './Free4all';
import Team from '../models/Team';
import NewUser from '../../shared/apiModels/NewUser';

export default class TeamBattle extends Free4all {
  public teams: Team[];
  public friendlyFire: boolean = false;

  findTeam(name: string) {
    return this.teams.find(team => name === team.name);
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    const team = this.findTeam(player.team);
    team && team.joinToTeam();
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    const team = this.findTeam(disconnected.team);
    super.disconnectPlayer(disconnected);
    team && team.leaveTeam();
  }

  bulletsDetectPower() {
    this.bullets
      .filter(bullet => bullet.allowForManipulate)
      .forEach(bullet => {
        const foundPlayerWithAura = this.getAlivePlayers().find(
          player =>
            bullet.owner !== player &&
            bullet.owner.team !== player.team &&
            player.selectedPower instanceof Aura &&
            player.selectedPower.isActive() &&
            collisionDetector.detectCollision(bullet, {
              ...player,
              size: player.selectedPower.getSize(),
            }).collision,
        );
        foundPlayerWithAura &&
          foundPlayerWithAura.selectedPower.effect({
            bullet,
            owner: foundPlayerWithAura,
          }) &&
          this.emitPowerInfo(foundPlayerWithAura);
      });
  }

  detectBulletsCollision() {
    this.bullets.forEach((bullet, i) => {
      [...this.getStaticObjects(), ...this.getAlivePlayers()]
        .filter(
          (object: StaticCircularObject | StaticRectangleObject | Player) =>
            !(object instanceof Player) ||
            (!this.friendlyFire && object instanceof Player && bullet.owner.team !== object.team) ||
            (this.friendlyFire && bullet.owner !== object),
        )
        .forEach((object: StaticCircularObject | StaticRectangleObject | Player) => {
          const bulletDirection = {
            dx: bullet.dx,
            dy: bullet.dy,
          };
          const { collision, angle } = collisionDetector.detectCollision(
            bullet,
            object,
            bulletDirection,
          );
          if (collision) {
            object.hitFromBullet(bullet, angle);
            if (object instanceof Player && !object.isAlive()) {
              const team = this.findTeam(bullet.owner.team);
              team && team.increasePoints();
              this.emitter.emitGamesList();
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }
}