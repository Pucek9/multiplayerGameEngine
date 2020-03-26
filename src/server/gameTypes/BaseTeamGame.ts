import NewUser from '../../shared/apiModels/NewUser';
import { HEAL } from '../../shared/constants';
import { compareBy, generateId } from '../../shared/helpers';
import Team from '../../shared/models/Team';

import Bot from '../models/Bot';
import Player from '../models/Player';
import Aura from '../models/powers/Aura';
import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';
import collisionDetector from '../services/CollisionDetector';
import playerService from '../services/PlayerService';
import BaseGame from './BaseGame';

export default class BaseTeamGame extends BaseGame {
  public teams: Team[];
  public friendlyFire = false;

  findTeam(name: string): Team {
    return this.teams.find(team => name === team.name);
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    const team = this.findTeam(player.team);
    team?.joinToTeam();
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    const team = this.findTeam(disconnected.team);
    super.disconnectPlayer(disconnected);
    team?.leaveTeam();
  }

  bulletsDetectPower() {
    this.bullets
      .filter(bullet => bullet.allowForManipulate)
      .forEach(bullet => {
        const foundPlayerWithAura = this.getAlivePlayers()
          .sort((player1, player2) => compareBy(player1, player2, { energy: 1 }))
          .find(
            player =>
              bullet.owner !== player &&
              (bullet.owner.team !== player.team || bullet.type === HEAL) &&
              player.selectedPower instanceof Aura &&
              player.selectedPower.isActive() &&
              collisionDetector.detectCollision(bullet, {
                ...player,
                size: player.selectedPower.getSize(),
              }).collision,
          );
        if (
          foundPlayerWithAura?.selectedPower.effect({
            bullet,
            owner: foundPlayerWithAura,
          })
        ) {
          this.emitPowerInfo(foundPlayerWithAura);
        } else {
          bullet.customFlag = true;
        }
      });
  }

  detectBulletsCollision() {
    this.bullets.forEach((bullet, i) => {
      [...this.getStaticObjects(), ...this.getAlivePlayers()]
        .filter(
          (object: StaticCircularObject | StaticRectangleObject | Player) =>
            !(object instanceof Player) ||
            (!this.friendlyFire && object instanceof Player && bullet.owner.team !== object.team) ||
            (this.friendlyFire && bullet.owner !== object) ||
            bullet.type === HEAL,
        )
        .forEach((object: StaticCircularObject | StaticRectangleObject | Player) => {
          const { collision, angle } = collisionDetector.detectCollision(bullet, object);
          if (collision) {
            object.hitFromBullet(bullet, angle);
            bullet.hit(angle, object);
            if (object instanceof Player && !object.isAlive()) {
              const team = this.findTeam(bullet.owner.team);
              team?.increasePoints();
              this.emitter.emitTeamsList(this);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  createBot(index: number): Bot {
    const teamsCount = this.teams.length;
    const team = this.teams[index % teamsCount];
    team.joinToTeam();
    const { x, y } = playerService.randNonCollisionPositionForMap(30, this);
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
    return bot;
  }

  trackClosestPlayer(player: Player): Player {
    return this.trackClosestPlayerWithCondition(player, _player => _player.team !== player.team);
  }
}
