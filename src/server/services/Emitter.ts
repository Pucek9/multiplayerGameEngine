import { API } from '../../shared/constants';
import Weapon from '../models/weapons/Weapon';
import Item from '../../shared/models/Item';
import ItemGeneratorAPI from '../../shared/apiModels/ItemGenerator';
import GameModel from '../gameTypes/GameModel';
import Player from '../models/Player';
import gamesManager from './GamesManager';
import Power from '../../shared/models/Power';
import BulletModel from '../../shared/models/BulletModel';

export default class Emitter {
  constructor(private socketIo: SocketIO.Server) {}

  emitGameState(gameState: GameModel) {
    this.socketIo.to(gameState.roomName).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
    this.socketIo.to(gameState.roomName).emit(API.GET_BULLETS, gameState.getBullets());
  }

  sendNewBullets(roomName: string, bullets: BulletModel[]) {
    this.socketIo.to(roomName).emit(API.ADD_NEW_BULLET, bullets);
  }

  updateWeaponInfo(id: string, weaponInfo: { selectedWeapon: Weapon; weapons: Item[] }) {
    this.socketIo.to(id).emit(API.GET_WEAPON_DETAILS, weaponInfo);
  }

  updatePowerInfo(
    id: string,
    powerInfo: { selectedPower: Power; powers: Power[]; energy: number },
  ) {
    this.socketIo.to(id).emit(API.GET_POWER_DETAILS, powerInfo);
  }

  updateItemGenerator(roomName: string, itemGenerator: ItemGeneratorAPI) {
    this.socketIo.to(roomName).emit(API.UPDATE_ITEM_GENERATOR, itemGenerator);
  }

  updateTimeToRevive(player) {
    this.socketIo.to(player.id).emit(API.UPDATE_TIME_TO_REVIVE, player.timeToRevive);
  }

  emitGamesList() {
    this.socketIo.emit(API.GET_GAMES_LIST, gamesManager.getGamesList());
  }

  emitTeamsList(gameState: GameModel) {
    this.socketIo.to(gameState.roomName).emit(API.GET_TEAMS_LIST, gameState.teams);
  }

  disconnectPlayer(roomName: string, disconnected: Player) {
    const id = disconnected.id;
    console.log(`[${id}] Player '${disconnected.name}' left '${roomName}'`);
    this.socketIo.to(roomName).emit(API.DISCONNECT_PLAYER, id);
    this.socketIo.to(id).emit(API.LEAVE_GAME);
    this.emitGamesList();

    const socket = this.socketIo.sockets.connected[id];
    if (socket) {
      socket.removeAllListeners(API.UPDATE_KEYS);
      socket.removeAllListeners(API.MOUSE_CLICK);
      socket.removeAllListeners(API.MOUSE_UP);
      socket.removeAllListeners(API.UPDATE_DIRECTION);
      socket.leave(roomName);
    }
  }
}
