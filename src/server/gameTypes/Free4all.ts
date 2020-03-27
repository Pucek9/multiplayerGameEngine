import { NewUser } from '../../shared/apiModels/NewUser';
import { randItem } from '../../shared/helpers';
import { Power } from '../../shared/models/Power';

import Bot from '../models/Bot';
import Player from '../models/Player';
import Accelerator from '../models/powers/Accelerator';
import Aim from '../models/powers/Aim';
import Heal from '../models/powers/Heal';
import Increaser from '../models/powers/Increaser';
import Pull from '../models/powers/Pull';
import Push from '../models/powers/Push';
import ReverseBullets from '../models/powers/ReverseBullets';
import SlowBullets from '../models/powers/SlowBullets';
import SuperAIM from '../models/powers/SuperAIM';
import Teleport from '../models/powers/Teleport';
import Knife from '../models/weapons/Knife';
import Pistol from '../models/weapons/Pistol';
import Emitter from '../services/Emitter';
import BaseGame from './BaseGame';

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
      Push,
      Pull,
    ]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addPower(new Increaser());
    player.addPower(new SuperAIM());
    player.addPower(new Aim());
    player.addPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addPower(new Push());
    player.addPower(new Pull());
    player.addAndSelectPower(new Heal());
    player.addAndSelectWeapon(new Knife());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    return player;
  }
}
