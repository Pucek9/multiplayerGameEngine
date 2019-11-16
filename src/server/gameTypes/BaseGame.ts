import collisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';
import { compareBy, generateId, randColor, times } from '../../shared/helpers';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Weapon from '../models/weapons/Weapon';
import Emitter from '../services/Emitter';
import Power from '../../shared/models/Power';
import BulletModel from '../../shared/models/BulletModel';
import Aura from '../models/powers/Aura';
import StaticRectangleObject from '../models/StaticRectangleObject';
import StaticCircularObject from '../models/StaticCircularObject';
import Bot from '../models/Bot';
import playerService from '../services/PlayerService';
import BulletApiModel from '../../shared/apiModels/BulletApiModel';
import ItemGenerator from '../models/ItemGenerator';
import Item from '../../shared/models/Item';
import Zone from '../models/Zone';

export default class BaseGame extends GameModel {
  public type = 'Free for all';
  public players: Player[] = [];
  public bullets: Bullet[] = [];
  private interval: NodeJS.Timeout | number;
  private customInterval: NodeJS.Timeout | number;

  constructor(public emitter: Emitter, params: Partial<BaseGame>) {
    super();
    Object.assign(this, params);
    this.teams?.forEach((team, index) => {
      const zone = this.map.zones?.[index % this.map.zones?.length] || Zone.fromMap(this.map);
      team.setZone(zone);
    });
    this.generateBots(this.botsCount);
    this.interval = setInterval(() => {
      this.updateBots();
      this.performKeysOperationForPlayers();
      this.updateBullets();
      this.detectBulletsCollision();
      this.bulletsDetectPower();
      this.emitter.emitGameState(this);
    }, 1000 / 60);
    this.customInterval = setInterval(() => {
      this.letBotsDoSomething();
      this.regeneratePlayers();
      this.updateTimeForDeadPlayers();
    }, 1000);
  }

  generateBots(count: number) {
    times(count, index => this.createBot(index));
  }

  createBot(index: number): Bot {
    const { x, y } = playerService.randNonCollisionPositionForMap(30, this);
    const bot = new Bot(
      `Bot_${index}${generateId()}`,
      `Bot_${index}`,
      `Bot_${index}`,
      randColor(),
      x,
      y,
      this.roomName,
    );
    this.players.push(bot);
    return bot;
  }

  getBots(): Array<Bot> {
    return <Array<Bot>>this.players.filter(player => player instanceof Bot);
  }

  updateBots() {
    this.getBots()
      .filter((bot: Bot) => bot.isAlive())
      .forEach((bot: Bot) => {
        const closestPlayer = this.trackClosestPlayer(bot);
        if (closestPlayer) {
          bot.updateCursor(closestPlayer);
          bot.updateDirection();
        }
      });
  }

  trackClosestPlayerFuturePosition(player: Player): { x: number; y: number } {
    const closestPlayer = this.trackClosestPlayer(player);
    if (closestPlayer) {
      const distance = collisionDetector.detectCollision(closestPlayer, player).distance;
      const bulletSpeed = player.selectedWeapon?.bulletConfig?.speed ?? 10;
      const enemyDirection = closestPlayer.legsDirection;
      const [x, y] = [
        closestPlayer.x + (enemyDirection.dx * distance) / bulletSpeed,
        closestPlayer.y + (enemyDirection.dy * distance) / bulletSpeed,
      ];
      return { x, y };
    }
  }

  trackClosestPlayer(player: Player): Player {
    return this.trackClosestPlayerWithCondition(player, _player => player !== _player);
  }

  trackClosestPlayerWithCondition(player: Player, condition: any): Player {
    const players = this.getAlivePlayers().filter(condition);
    if (players?.length) {
      return players.reduce((previousPlayer, currentPlayer) => {
        const { distance: previousClosestDistance } = collisionDetector.detectCollision(
          player,
          previousPlayer,
        );
        const { distance } = collisionDetector.detectCollision(player, currentPlayer);
        return distance < previousClosestDistance ? currentPlayer : previousPlayer;
      });
    }
  }

  letBotsDoSomething() {
    this.getBots().forEach((bot: Bot) => {
      bot.performRandKeys();
      this.mouseClick(bot.id);
    });
  }

  getPlayer(id: string): Player {
    return this.players.find(player => player.id === id);
  }

  getAlivePlayers(): Array<Player> {
    return this.players.filter(player => player.alive === true);
  }

  getPlayers(): Array<Player> {
    return this.players;
  }

  getNormalizedBullets(): Array<BulletApiModel> {
    return this.bullets.map(({ id, x, y, size }) => ({
      id,
      x,
      y,
      size,
    }));
  }

  getMapName(): string {
    return this.map.getMapName();
  }

  getStaticObjects(): Array<StaticRectangleObject | StaticCircularObject> {
    return this.map.getStaticObjects();
  }

  getItemGenerators() {
    return this.map.getItemGenerators();
  }

  getItemGeneratorsAPI(): Array<ItemGeneratorAPI> {
    return this.getItemGenerators().map(itemGenerator => new ItemGeneratorAPI(itemGenerator));
  }

  deleteItemGenerator(itemGenerator: ItemGenerator<Item>) {
    this.map.deleteItemGenerator(itemGenerator);
  }

  deleteBulletIfInactive(bullet: Bullet, index: number) {
    if (!bullet.isActive()) {
      this.bullets.splice(index, 1);
    }
  }

  updateBullets() {
    this.bullets.forEach((bullet, i) => {
      bullet.updatePosition();
      this.deleteBulletIfInactive(bullet, i);
    });
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
            bullet.owner !== object,
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
            this.deleteBulletIfInactive(bullet, i);
          }
        });
    });
  }

  shoot(owner: string) {
    const player = this.getPlayer(owner);
    if (player) {
      player.shoot(this);
    }
  }

  generateBullets(bullets: Bullet[]) {
    this.bullets.push(...bullets);
    this.emitter.sendNewBullets(this.roomName, bullets.map(this.toBulletModel));
  }

  toBulletModel(bullet: Bullet): BulletModel {
    return {
      shape: bullet.shape,
      type: bullet.type,
      x: bullet.x,
      y: bullet.y,
      id: bullet.id,
      size: bullet.size,
      color: bullet.color,
      targetX: bullet.targetX,
      targetY: bullet.targetY,
      flash: bullet.flash,
    };
  }

  revivePlayer(id: string) {
    const player = this.getPlayer(id);
    if (player && !this.detectPlayerCollision(player)) {
      player.revive();
    }
  }

  regeneratePlayers(value?: number) {
    this.getAlivePlayers().forEach(player => {
      player.regenerate(value);
      this.emitPowerInfo(player);
    });
  }

  connectPlayer(newPlayer: NewUser): Player {
    const { x, y } = playerService.randNonCollisionPositionForMap(30, this);
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

  disconnectPlayer(disconnected: Player) {
    this.players.splice(this.players.indexOf(disconnected), 1);
    this.emitter.disconnectPlayer(this.roomName, disconnected);
  }

  updateKeys(id: string, keys: Array<string>) {
    const player = this.getPlayer(id);
    if (player) {
      player.keys = new Set(keys);
    }
  }

  performKeysOperationForPlayers() {
    this.players.forEach(player => this.performKeysOperation(player));
  }

  performKeysOperation(player: Player) {
    if (player) {
      this.steering.performKeysOperation(this, player);
    }
  }

  updateCursor(mouseCoordinates: MouseCoordinates) {
    const owner = this.getPlayer(mouseCoordinates.owner);
    if (owner) {
      this.cursor.updateCursor(mouseCoordinates, owner);
      owner.updateDirection();
    }
  }

  mouseClick(owner: string) {
    const player = this.getPlayer(owner);
    if (player.isAlive()) {
      player.setMouseDown();
      this.shoot(owner);
    } else {
      this.revivePlayer(owner);
    }
  }

  mouseRightClick(owner: string) {
    const player = this.getPlayer(owner);
    if (player.isAlive() && player.selectedPower?.useClickPower) {
      player.useClickPower(this);
      this.emitPowerInfo(player);
    }
  }

  mouseUp(owner: string) {
    const player = this.getPlayer(owner);
    if (player?.isAlive()) {
      player.setMouseUp();
    }
  }

  emitWeaponInfo(player: Player) {
    this.emitter.updateWeaponInfo(player.id, {
      selectedWeapon: player.selectedWeapon,
      weapons: player.weapons.map((weapon: Weapon) => ({
        type: weapon.type,
        id: weapon.id,
      })),
    });
  }

  emitPowerInfo(player: Player) {
    this.emitter.updatePowerInfo(player.id, {
      selectedPower: player.selectedPower,
      powers: player.powers.map((power: Power) => ({
        type: power.type,
        id: power.id,
      })),
      energy: player.energy,
    });
  }

  addWeapon(player: Player, newWeapon: Weapon) {
    const weapon = player.weapons.find(_weapon => _weapon.type === newWeapon.type);
    if (weapon) {
      const sumBullets = weapon.bulletsInMagazine + newWeapon.bulletsInMagazine;
      weapon.magazines +=
        newWeapon.magazines + Math.floor(sumBullets / weapon.maxBulletsInMagazine);
      weapon.bulletsInMagazine = sumBullets % weapon.maxBulletsInMagazine;
      if (weapon.bulletsInMagazine === 0) {
        weapon.reload();
      }
    } else {
      player.addAndSelectWeapon(newWeapon);
    }
  }

  detectPlayerCollisionWithGenerator(player: Player, direction?: Direction) {
    this.getItemGenerators().forEach(generator => {
      if (
        collisionDetector.detectCollision(player, generator, direction).collision &&
        generator.isReady()
      ) {
        generator.pickup(this, player);
      }
    });
  }

  detectPlayerCollisionWithObjects(player: Player, direction?: Direction): boolean {
    const allObjects = [
      ...this.getStaticObjects(),
      ...this.getAlivePlayers().filter(object => player !== object),
    ];
    return collisionDetector.detectObjectCollisionWithOtherObjects(player, allObjects, direction);
  }

  detectPlayerCollision(player: Player, direction?: Direction): boolean {
    this.detectPlayerCollisionWithGenerator(player, direction);
    return this.detectPlayerCollisionWithObjects(player, direction);
  }

  updateTimeForDeadPlayers(): number {
    const playersForRevive = this.players.filter(
      player => !player.isAlive() && player.timeToRevive !== 0,
    );
    playersForRevive?.forEach(player => {
      player.decreaseTimeToRevive();
      this.emitter.updateTimeToRevive(player);
    });
    return playersForRevive?.length;
  }
}
