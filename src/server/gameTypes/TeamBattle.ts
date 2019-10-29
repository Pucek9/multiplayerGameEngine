import Player from '../models/Player';
import NewUser from '../../shared/apiModels/NewUser';
import { randItem } from '../../shared/helpers';
import ReverseBullets from '../models/powers/ReverseBullets';
import SlowBullets from '../models/powers/SlowBullets';
import Accelerator from '../models/powers/Accelerator';
import Pistol from '../models/weapons/Pistol';
import BaseTeamGame from './BaseTeamGame';
import Teleport from '../models/powers/Teleport';
import Knife from '../models/weapons/Knife';
import Bot from '../models/Bot';
import Power from '../../shared/models/Power';

export default class TeamBattle extends BaseTeamGame {
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

  createBot(index: number): Bot {
    const bot = super.createBot(index);
    const SuperPower = randItem<new (...args: any[]) => Power>([
      ReverseBullets,
      SlowBullets,
      Accelerator,
    ]);
    bot.addAndSelectPower(new SuperPower());
    bot.addAndSelectWeapon(new Pistol({ magazines: 500 }));
    return bot;
  }
}
