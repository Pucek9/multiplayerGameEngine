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
import { BALL, LEGS, WHITE } from '../../shared/constants';

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
              bullet.owner = object.owner;
              // TODO: Something is going wrong
              bullet.distance = 0;
              bullet.vectorFT = object.vectorFT;
              bullet.direction.dx = object.direction.dx;
              bullet.direction.dy = object.direction.dy;
              // bullet.hit({ x: -angle.x, y: -angle.y }, object);
              bullet.speed = object.speed + 5;
            } else {
              bullet.hit(angle, object);
            }
            if (object instanceof Goal && bullet.type === BALL) {
              if (object.team !== bullet.owner?.team) {
                const team = this.findTeam(bullet.owner.team);
                team?.decreasePoints();
              } else {
                const team = this.findTeam(object.team);
                team?.increasePoints();
              }
              this.startRound();
              console.log(this.teams);

              this.emitter.emitTeamsList(this);
            }
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  detectPlayerCollisionWithObjects(player: Player): boolean {
    const allObjects = [
      ...this.getStaticObjects(),
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
