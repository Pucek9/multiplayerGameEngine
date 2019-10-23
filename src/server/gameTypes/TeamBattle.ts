import collisionDetector from '../services/CollisionDetector';
import Player from '../models/Player';
import Aura from '../models/powers/Aura';
import StaticRectangleObject from '../models/StaticRectangleObject';
import StaticCircularObject from '../models/StaticCircularObject';
import Free4all from './Free4all';
import Team from '../models/Team';
import NewUser from '../../shared/apiModels/NewUser';
import playerService from '../services/PlayerService';
import Bot from '../models/Bot';
import { generateId, randItem } from '../../shared/helpers';
import ReverseBullets from '../models/powers/ReverseBullets';
import SlowBullets from '../models/powers/SlowBullets';
import Accelerator from '../models/powers/Accelerator';
import Pistol from '../models/weapons/Pistol';

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
              this.emitter.emitTeamsList(this);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  createBot(index: number) {
    const teamsCount = this.teams.length;
    const team = this.teams[index % teamsCount];
    team.joinToTeam();
    const { x, y } = playerService.randNonCollisionPosition(30, this);
    const bot = new Bot(
      `Bot_${index}${generateId()}`,
      `Bot_${index}`,
      team.name,
      team.color,
      x,
      y,
      this.roomName,
    );
    this.players.push(bot);
    const SuperPower = randItem([ReverseBullets, SlowBullets, Accelerator]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }

  trackClosestPlayer(bot: Bot) {
    return this.trackClosestPlayerWithCondition(bot, player => player.team !== bot.team);
  }
}
