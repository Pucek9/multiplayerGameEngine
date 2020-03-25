import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import { generateId } from '../../shared/helpers';
import Item from '../../shared/models/Item';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import Weapon from './weapons/Weapon';
import AidKit from './AidKit';
import Player from './Player';

type ParameterlessConstructor<T> = new (Item?) => T;

export default class ItemGenerator<T> extends StaticCircularObjectModel {
  item: ParameterlessConstructor<Item>;
  itemProps: any;
  ready = true;
  repeated = true;
  type: string;
  time: number;
  id: number;

  constructor(params: Partial<ItemGenerator<Item>>) {
    super(params);
    this.id = params.id || generateId();
    this.itemProps = params.itemProps || {};
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

  generateItem(): Item {
    return new this.item(this.itemProps);
  }

  pickup(game, player: Player) {
    this.deactivate();
    const timeout = setTimeout(() => {
      this.activate();
      game.emitter.updateItemGenerator(game.roomName, new ItemGeneratorAPI(this));
    }, this.time);
    const item = this.generateItem();
    if (item instanceof Weapon) {
      game.addWeapon(player, item);
      game.emitWeaponInfo(player);
    } else if (item instanceof AidKit) {
      player.takeAidKit(item);
      game.emitPowerInfo(player);
    }
    game.emitter.updateItemGenerator(game.roomName, new ItemGeneratorAPI(this));
    if (!this.repeated) {
      clearTimeout(timeout);
      game.deleteItemGenerator(this);
    }
  }
}
