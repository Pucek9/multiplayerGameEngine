import { API } from '../../shared/constants';
import NewBullet from '../../shared/apiModels/NewBullet';
import Weapon from '../models/weapons/Weapon';
import Item from '../../shared/models/Item';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import GameModel from '../gameTypes/GameModel';

export default class Emitter {
  constructor(private socketIo) {}

  emitGameState(gameState: GameModel) {
    this.socketIo.to(gameState.roomName).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
    this.socketIo.to(gameState.roomName).emit(API.GET_BULLETS, gameState.getBullets());
  }

  sendNewBullets(roomName: string, bullets: NewBullet[]) {
    this.socketIo.to(roomName).emit(API.ADD_NEW_BULLET, bullets);
  }

  updateWeaponInfo(id: string, weaponInfo: { selectedWeapon: Weapon; weapons: Item[] }) {
    this.socketIo.to(id).emit(API.GET_WEAPON_DETAILS, weaponInfo);
  }

  updateItemGenerator(roomName: string, itemGenerator: ItemGeneratorAPI) {
    this.socketIo.to(roomName).emit(API.UPDATE_ITEM_GENERATOR, itemGenerator);
  }
}
