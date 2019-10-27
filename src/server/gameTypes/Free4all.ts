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

export default class Free4all extends BaseGame {
  constructor(public emitter: Emitter, params: Partial<Free4all>) {
    super(emitter, params);
  }

  createBot(index: number) {
    const bot = super.createBot(index);
    const SuperPower = randItem([ReverseBullets, SlowBullets, Accelerator]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addAndSelectPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addAndSelectWeapon(new Knife());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    return player;
  }
}
