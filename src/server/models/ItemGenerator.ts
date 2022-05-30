import { ItemGeneratorAPI } from '../../shared/apiModels';
import { generateId } from '../../shared/helpers';
import { CommonObjectModel } from '../../shared/models';
import { ParameterlessConstructor } from '../../shared/types';

import AidKit from './AidKit';
import Player from './Player';
import Weapon from './weapons/Weapon';

export default class ItemGenerator<ItemClass> extends CommonObjectModel {
  ItemClass: ParameterlessConstructor<ItemClass>;
  itemProps: Partial<ItemClass>;
  ready = true;
  repeated = true;
  type: string;
  time: number;
  id: number;

  constructor(params: Partial<ItemGenerator<ItemClass>>) {
    super(params);
    this.id = params.id || generateId();
    this.itemProps = params.itemProps || {};
    this.type = this.ItemClass.name;
    Object.assign(this, params);
    Object.seal(this);
  }

  isReady(): boolean {
    return this.ready;
  }

  activate() {
    this.ready = true;
  }

  deactivate() {
    this.ready = false;
  }

  generateItem(): ItemClass {
    return new this.ItemClass(this.itemProps);
  }

  pickup(game, player: Player) {
    this.deactivate();
    const timeout = setTimeout(() => {
      this.activate();
      game.emitter?.updateItemGenerator(game.roomName, new ItemGeneratorAPI(this));
    }, this.time);
    const item = this.generateItem();
    if (item instanceof Weapon) {
      game.addWeapon(player, item);
      game.emitWeaponInfo(player);
    } else if (item instanceof AidKit) {
      player.takeAidKit(item);
      game.emitPowerInfo(player);
    }
    game.emitter?.updateItemGenerator(game.roomName, new ItemGeneratorAPI(this));
    if (!this.repeated) {
      clearTimeout(timeout);
      game.deleteItemGenerator(this);
    }
  }
}
