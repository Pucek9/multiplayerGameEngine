import collisionDetector from '../services/CollisionDetector';
import Bullet from '../models/Bullet';
import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import GameModel from './GameModel';
import Direction from '../../shared/models/Direction';
import { generateId, randColor, randItem, times } from '../../shared/helpers';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Weapon from '../models/weapons/Weapon';
import Emitter from '../services/Emitter';
import AidKit from '../models/AidKit';
import SlowBullets from '../models/powers/SlowBullets';
import Power from '../../shared/models/Power';
import Teleport from '../models/powers/Teleport';
import BulletModel from '../../shared/models/BulletModel';
import ReverseBullets from '../models/powers/ReverseBullets';
import Accelerator from '../models/powers/Accelerator';
import Pistol from '../models/weapons/Pistol';
import Knife from '../models/weapons/Knife';
import Aura from '../models/powers/Aura';
import ClickPower from '../models/powers/ClickPower';
import StaticRectangleObject from '../models/StaticRectangleObject';
import StaticCircularObject from '../models/StaticCircularObject';
import Bot from '../models/Bot';
import playerService from '../services/PlayerService';

export default class Free4all extends GameModel {
  public type: string = 'Free for all';
  public players: Player[] = [];
  public bullets: Bullet[] = [];
  private interval;
  private customInterval;

  constructor(public emitter: Emitter, params: Partial<Free4all>) {
    super();
    Object.assign(this, params);
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

  createBot(index: number) {
    const { x, y } = playerService.randNonCollisionPosition(30, this);
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
    const SuperPower = randItem([ReverseBullets, SlowBullets, Accelerator]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }

  getBots(): Player[] {
    return this.players.filter(player => player instanceof Bot);
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

  trackClosestPlayer(bot: Bot) {
    return this.trackClosestPlayerWithCondition(bot, player => player !== bot);
  }

  trackClosestPlayerWithCondition(player: Player, condition) {
    const players = this.getAlivePlayers().filter(condition);
    if (players && players.length) {
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

  getPlayer(id: string) {
    return this.players.find(player => player.id === id);
  }

  getAlivePlayers() {
    return this.players.filter(player => player.alive === true);
  }

  getPlayers() {
    return this.players;
  }

  isPlayerInThisGame(id: string) {
    return this.players.find(player => player.id === id);
  }

  getBullets() {
    return this.bullets.map(bullet => ({
      id: bullet.id,
      x: bullet.x,
      y: bullet.y,
      size: bullet.size,
    }));
  }

  getMapName() {
    return this.map.getMapName();
  }

  getStaticObjects(): (StaticRectangleObject | StaticCircularObject)[] {
    return this.map.getStaticObjects();
  }

  getItemGenerators() {
    return this.map.getItemGenerators();
  }

  getItemGeneratorsAPI() {
    return this.getItemGenerators().map(itemGenerator => new ItemGeneratorAPI(itemGenerator));
  }

  deleteBulletIfInactive(bullet: Bullet, i) {
    if (!bullet.isActive()) {
      this.bullets.splice(i, 1);
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
        const foundPlayerWithAura = this.getAlivePlayers().find(
          player =>
            bullet.owner !== player &&
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
    player && !this.detectPlayerCollision(player) && player.revive();
  }

  regeneratePlayers(value?: number) {
    this.getAlivePlayers().forEach(player => {
      player.regenerate(value);
      this.emitPowerInfo(player);
    });
  }

  connectPlayer(newPlayer: NewUser): Player {
    const { x, y } = playerService.randNonCollisionPosition(30, this);
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.team,
      newPlayer.color,
      x,
      y,
      this.roomName,
    );
    //
    player.addAndSelectPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addAndSelectWeapon(new Knife());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    this.players.push(player);
    return player;
  }

  disconnectPlayer(disconnected: Player) {
    this.players.splice(this.players.indexOf(disconnected), 1);
    this.emitter.disconnectPlayer(this.roomName, disconnected);
  }

  updateKeys(id: string, keys: Array<string>) {
    const player = this.getPlayer(id);
    player && (player.keys = new Set(keys));
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
      if (player.selectedPower instanceof ClickPower && player.keys.has('Shift')) {
        player.usePower(this, true);
        this.emitPowerInfo(player);
      } else {
        this.shoot(owner);
      }
    } else {
      this.revivePlayer(owner);
    }
  }

  mouseUp(owner: string) {
    const player = this.getPlayer(owner);
    if (player && player.isAlive()) {
      player.setMouseUp();
    }
  }

  emitWeaponInfo(player) {
    this.emitter.updateWeaponInfo(player.id, {
      selectedWeapon: player.selectedWeapon,
      weapons: player.weapons.map((weapon: Weapon) => ({
        type: weapon.type,
        id: weapon.id,
      })),
    });
  }

  emitPowerInfo(player) {
    this.emitter.updatePowerInfo(player.id, {
      selectedPower: player.selectedPower,
      powers: player.powers.map((power: Power) => ({
        type: power.type,
        id: power.id,
      })),
      energy: player.energy,
    });
  }

  addWeapon(player, newWeapon) {
    const weapon = player.weapons.find(weapon => weapon.type === newWeapon.type);
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
        generator.deactivate();
        setTimeout(() => {
          generator.activate();
          this.emitter.updateItemGenerator(this.roomName, new ItemGeneratorAPI(generator));
        }, generator.time);
        const item = generator.generateItem();
        if (item instanceof Weapon) {
          this.addWeapon(player, item);
          this.emitWeaponInfo(player);
        } else if (item instanceof AidKit) {
          player.takeAidKit(item);
          this.emitPowerInfo(player);
        }
        this.emitter.updateItemGenerator(this.roomName, new ItemGeneratorAPI(generator));
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

  updateTimeForDeadPlayers() {
    this.players
      .filter(player => !player.isAlive() && player.timeToRevive !== 0)
      .forEach(player => {
        player.decreaseTimeToRevive();
        this.emitter.updateTimeToRevive(player);
      });
  }
}
