import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import playerService from '../services/PlayerService';
import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';
import collisionDetector from '../services/CollisionDetector';
import Bot from '../models/Bot';
import BaseTeamGame from './BaseTeamGame';

export default class RoundTeamBattle extends BaseTeamGame {
  maxTime: number;
  round = 0;
  maxRound = 5;
  timeCounterActive = false;

  constructor(emitter, params) {
    super(emitter, params);
    this.startRound();
  }

  setPlayerPosition(player: Player) {
    const team = this.findTeam(player.team);
    if (team) {
      const { x, y } = playerService.randNonCollisionPositionForZone(30, this, team.zone);
      player.setPosition(x, y);
    }
  }

  startRound() {
    this.timeCounterActive = true;
    this.round += 1;
    this.players.forEach(player => {
      this.setPlayerPosition(player);
      player.die(false);
    });
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    this.setPlayerPosition(player);
    return player;
  }

  createBot(index: number): Bot {
    const bot = super.createBot(index);
    return bot;
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
          const { collision, angle } = collisionDetector.detectCollision(bullet, object);
          if (collision) {
            object.hitFromBullet(bullet, angle);
            bullet.hit(angle, object);
            if (object instanceof Player && !object.isAlive()) {
              const team = this.findTeam(bullet.owner.team);
              const enemyPlayersAlive = this.getAlivePlayers().filter(
                player => player.team === object.team,
              ).length;
              if (enemyPlayersAlive === 0) {
                team?.increasePoints();
                this.startRound();
              }
              this.emitter.emitTeamsList(this);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  updateTimeForDeadPlayers(): number {
    if (this.timeCounterActive) {
      const updatedPlayersLength = super.updateTimeForDeadPlayers();
      if (updatedPlayersLength === 0) {
        this.timeCounterActive = false;
      }
      return updatedPlayersLength;
    }
  }
}
