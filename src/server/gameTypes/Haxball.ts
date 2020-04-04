import { NewUser } from '../../shared/apiModels';
import { BALL, INVISIBLE, LEGS, WHITE } from '../../shared/constants';
import { Team } from '../../shared/models';

import Bot from '../models/Bot';
import Bullet from '../models/Bullet';
import Goal from '../models/Goal';
import Player from '../models/Player';
import Accelerator from '../models/powers/Accelerator';
import StaticCircularObject from '../models/StaticCircularObject';
import StaticRectangleObject from '../models/StaticRectangleObject';
import Legs from '../models/weapons/Legs';
import collisionDetector from '../services/CollisionDetector';
import RoundTeamBattle from './RoundTeamBattle';

export default class Haxball extends RoundTeamBattle {
  constructor(emitter, params) {
    super(emitter, params);
    this.setupGoals();
  }

  startRound() {
    super.startRound();
    this.bullets = [
      new Bullet({
        type: BALL,
        owner: null,
        fromX: 0,
        fromY: 0,
        targetX: 1,
        targetY: 1,
        color: WHITE,
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
        hitFromBullet(bullet, angle) {},
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
        .filter(object => bullet !== object && !(bullet.owner === object && bullet.type === LEGS))
        .forEach((object: StaticCircularObject | StaticRectangleObject | Player | Bullet) => {
          const { collision, angle } = collisionDetector.detectCollision(bullet, object);
          if (collision) {
            if (object instanceof Bullet && object.type === LEGS && bullet.type === BALL) {
              this.kickBall(object, bullet);
            } else {
              bullet.hit(angle, object);
            }
            if (object instanceof Goal && bullet.type === BALL) {
              this.shootGoal(object, bullet);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  kickBall(legs: Bullet, ball: Bullet) {
    ball.owner = legs.owner;
    // TODO: Something is going wrong
    ball.distance = 0;
    ball.vectorFT = legs.vectorFT;
    ball.direction.dx = legs.direction.dx;
    ball.direction.dy = legs.direction.dy;
    // ball.hit({ x: -angle.x, y: -angle.y }, legs);
    ball.speed = legs.speed + 5;
  }

  shootGoal(goal: Goal, ball: Bullet) {
    if (goal.team !== ball.owner?.team) {
      const team = this.findTeam(ball.owner.team);
      ball.owner.addKills(-1);
      team?.decreasePoints();
    } else {
      const team = this.findTeam(goal.team);
      ball.owner.addKills(1);
      team?.increasePoints();
    }
    this.startRound();
    this.emitter.emitTeamsList(this);
  }

  detectPlayerCollisionWithObjects(player: Player): boolean {
    const allObjects = [
      ...this.getStaticObjects().filter(object => object.color !== INVISIBLE),
      ...this.getAlivePlayers().filter(object => player !== object),
    ];
    this.detectBallCollision(player, allObjects);
    return collisionDetector.detectObjectCollisionWithOtherObjects(player, allObjects);
  }

  protected detectBallCollision(player: Player, allObjects) {
    const ball = this.bullets.find(bullet => bullet.type === BALL);
    if (ball) {
      const { collision, angle } = collisionDetector.detectCollision(player, ball);
      if (collision) {
        ball.owner = player;
        // TODO: Something is going wrong
        ball.distance = 0;
        ball.hit({ x: -angle.x, y: -angle.y }, player);
        ball.speed = player.speed + 5;
      }
    }
  }
}
