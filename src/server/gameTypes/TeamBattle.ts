import { NewUser } from '../../shared/apiModels/NewUser';
import { randItem } from '../../shared/helpers';
import { Power } from '../../shared/models/Power';

import Bot from '../models/Bot';
import Player from '../models/Player';
import Accelerator from '../models/powers/Accelerator';
import Aim from '../models/powers/Aim';
import Heal from '../models/powers/Heal';
import Increaser from '../models/powers/Increaser';
import ReverseBullets from '../models/powers/ReverseBullets';
import SlowBullets from '../models/powers/SlowBullets';
import SuperAIM from '../models/powers/SuperAIM';
import Teleport from '../models/powers/Teleport';
import Knife from '../models/weapons/Knife';
import Pistol from '../models/weapons/Pistol';
import BaseTeamGame from './BaseTeamGame';

export default class TeamBattle extends BaseTeamGame {
  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addPower(new Increaser());
    player.addPower(new SuperAIM());
    player.addPower(new Aim());
    player.addPower(new Accelerator());
    player.addPower(new Teleport());
    player.addPower(new SlowBullets());
    player.addPower(new ReverseBullets());
    player.addAndSelectPower(new Heal());
    player.addAndSelectWeapon(new Knife());
    this.emitPowerInfo(player);
    this.emitWeaponInfo(player);
    return player;
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
}
