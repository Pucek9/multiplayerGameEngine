import Accelerator from '../models/powers/Accelerator';
import Legs from '../models/weapons/Legs';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import Bot from '../models/Bot';
import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';
import collisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import RoundTeamBattle from './RoundTeamBattle';
import Goal from '../models/Goal';
import Team from '../../shared/models/Team';

export default class Haxball extends RoundTeamBattle {
  constructor(emitter, params) {
    super(emitter, params);
    this.setupGoals();
  }

  startRound() {
    super.startRound();
    this.bullets = [
      new Bullet({
        owner: null,
        fromX: 0,
        fromY: 0,
        targetX: 1,
        targetY: 1,
        color: 'white',
        size: 8,
        power: 0,
        range: 100,
        speed: 0,
        minSpeed: 0,
        defaultSpeed: 7,
        allowForManipulate: false,
        hit(angle?: { x: number; y: number }) {
          if (angle) {
            this.reverseX *= angle.x;
            this.reverseY *= angle.y;
          }
          this.decreaseSpeedToMin(1);
        },
        hitFromBullet(bullet, angle) {
          console.log(angle);
          this.owner = bullet.owner;
          this.reverseX = angle.x;
          this.reverseY = angle.y;
          this.distance = 0;
          this.speed = this.defaultSpeed;
        },
        additionalAction() {
          this.decreaseSpeedToMin(0.05);
        },
        deactivate() {},
      }),
    ];
    this.emitter.sendNewBullets(this.roomName, this.bullets.map(this.toBulletModel));
  }

  setupGoals() {
    const goals = <Array<Goal>>this.getStaticObjects().filter(object => object instanceof Goal);
    if (goals.length === this.teams.length) {
      this.teams.forEach((team: Team, index: number) => {
        goals[index].team = team.name;
        goals[index].color = team.color;
      });
    }
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addAndSelectPower(new Accelerator());
    player.addAndSelectWeapon(new Legs());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    return player;
  }

  createBot(index: number): Bot {
    const bot = super.createBot(index);
    bot.addAndSelectPower(new Accelerator());
    bot.addAndSelectWeapon(new Legs());
    return bot;
  }

  detectBulletsCollision() {
    this.bullets.forEach((bullet, i) => {
      [...this.getStaticObjects(), ...this.getAlivePlayers(), ...this.bullets]
        .filter(object => bullet !== object)
        .forEach((object: StaticCircularObject | StaticRectangleObject | Player | Bullet) => {
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
            if (object instanceof Goal) {
              if (object.team !== bullet.owner.team) {
                const team = this.findTeam(bullet.owner.team);
                team?.increasePoints();
              } else {
                const team = this.findTeam(object.team);
                team?.decreasePoints();
              }
              this.startRound();
              this.emitter.emitTeamsList(this);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }
}
