import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import { randItem } from '../../shared/helpers';
import Emitter from '../services/Emitter';
import SlowBullets from '../models/powers/SlowBullets';
import Teleport from '../models/powers/Teleport';
import ReverseBullets from '../models/powers/ReverseBullets';
import Accelerator from '../models/powers/Accelerator';
import Pistol from '../models/weapons/Pistol';
import Knife from '../models/weapons/Knife';
import BaseGame from './BaseGame';
import Power from '../../shared/models/Power';
import Bot from '../models/Bot';
import SuperAIM from '../models/powers/SuperAIM';
import AIM from '../models/powers/AIM';

export default class Free4all extends BaseGame {
  constructor(public emitter: Emitter, params: Partial<Free4all>) {
    super(emitter, params);
  }

  createBot(index: number): Bot {
    const bot = super.createBot(index);
    const SuperPower = randItem<new (...args: any[]) => Power>([
      SuperAIM,
      ReverseBullets,
      SlowBullets,
      Accelerator,
    ]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addAndSelectPower(new SuperAIM());
    player.addPower(new AIM());
    player.addPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addAndSelectWeapon(new Knife());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    return player;
  }
}
