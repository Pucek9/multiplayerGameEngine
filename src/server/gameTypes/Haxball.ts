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
import Push from '../models/powers/Push';
import Pull from '../models/powers/Pull';

export default class Haxball extends RoundTeamBattle {
  constructor(emitter, params) {
    super(emitter, params);
    this.setupGoals();
  }

  startRound() {
    super.startRound();
    this.bullets = [
      new Bullet({
        type: 'Ball',
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
        hit(angle?: { x: number; y: number }, object?) {
          console.log('hit', this.type, angle, object?.type || object?.shape);
          if (angle) {
            this.reverseX *= angle.x;
            this.reverseY *= angle.y;
          }
          this.decreaseSpeedToMin(1);
        },
        hitFromBullet(bullet, angle) {
          console.log('hitFromBullet', this.type, angle, bullet.type);
          this.owner = bullet.owner;
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
    player.addPower(new Push());
    player.addPower(new Pull());
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
        .filter(object => bullet !== object && !(bullet.owner === object && bullet.type === 'Legs'))
        .forEach((object: StaticCircularObject | StaticRectangleObject | Player | Bullet) => {
          const { collision, angle } = collisionDetector.detectCollision(bullet, object);
          if (collision) {
            bullet.hit(angle, object);
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

  detectPlayerCollisionWithObjects(player: Player): boolean {
    const allObjects = [
      ...this.getStaticObjects(),
      ...this.getAlivePlayers().filter(object => player !== object),
    ];
    const ball = this.bullets.find(bullet => bullet.type === 'Ball');
    if (ball && collisionDetector.detectCollision(player, ball).collision) {
      ball.direction.dx = player.direction.dx;
      ball.direction.dy = player.direction.dy;
      if (!collisionDetector.detectObjectCollisionWithOtherObjects(ball, allObjects)) {
        ball.x += player.direction.dx;
        ball.y += player.direction.dy;
      }
    }
    return collisionDetector.detectObjectCollisionWithOtherObjects(player, allObjects);
  }
}
