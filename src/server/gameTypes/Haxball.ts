import Accelerator from '../models/powers/Accelerator';
import Legs from '../models/weapons/Legs';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import BaseTeamGame from './BaseTeamGame';
import Bot from '../models/Bot';

export default class Haxball extends BaseTeamGame {
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
}
