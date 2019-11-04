import TeamBattle from './TeamBattle';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import playerService from '../services/PlayerService';
import StaticCircularObject from "../models/StaticCircularObject";
import StaticRectangleObject from "../models/StaticRectangleObject";
import collisionDetector from "../services/CollisionDetector";

export default class RoundTeamBattle extends TeamBattle {
  maxTime: number;
  round = 0;
  maxRound = 5;
  timeCounterActive = false;

  constructor(emitter, params) {
    super(emitter, params);
    this.teams?.forEach((team, index) =>
      team.setZone(this.map.zones[index % this.map.zones.length]),
    );
    this.startRound();
  }

  startRound() {
    this.timeCounterActive = true;
    this.round += 1;
    this.players.forEach(player => {
      const team = this.findTeam(player.team);
      const { x, y } = playerService.randNonCollisionPositionForZone(30, this, team.zone);
      player.setPosition(x,y);
      player.die(false);
    })
  }

  connectPlayer(newPlayer: NewUser): Player {
    const team = this.findTeam(newPlayer.team);
    const { x, y } = playerService.randNonCollisionPositionForZone(30, this, team.zone);
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.team,
      newPlayer.color,
      x,
      y,
      this.roomName,
    );
    this.players.push(player);
    return player;
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
                const enemyPlayersAlive = this.getAlivePlayers().filter(player => player.team === object.team).length;
                if(enemyPlayersAlive === 0) {
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
    if(this.timeCounterActive) {
      const updatedPlayersLength = super.updateTimeForDeadPlayers();
      if(updatedPlayersLength === 0) {
        this.timeCounterActive = false;
      }
      return updatedPlayersLength;
    }
  }

}
