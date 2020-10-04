import { ItemGeneratorAPI, PowersApiModel, WeaponsApiModel } from '../../shared/apiModels';
import { API } from '../../shared/constants';
import { BulletModel } from '../../shared/models';

import GameModel from '../gameTypes/GameModel';
import Player from '../models/Player';
import gamesManager from './GamesManager';

export default class Emitter {
  constructor(private socketIo: SocketIO.Server) {}

  emitGameState(gameState: GameModel) {
    this.socketIo.to(gameState.roomName).emit(API.GET_PLAYERS_STATE, gameState.getPlayers());
    this.socketIo.to(gameState.roomName).emit(API.GET_BULLETS, gameState.getNormalizedBullets());
  }

  sendNewBullets(roomName: string, bullets: BulletModel[]) {
    this.socketIo.to(roomName).emit(API.ADD_NEW_BULLET, bullets);
  }

  updateWeaponInfo(id: string, weaponInfo: WeaponsApiModel) {
    this.socketIo.to(id).emit(API.GET_WEAPON_DETAILS, weaponInfo);
  }

  updatePowerInfo(id: string, powerInfo: PowersApiModel) {
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

  emitStaticObjects(id: string, gameState) {
    this.socketIo.to(id).emit(API.GET_STATIC_OBJECTS, gameState.getStaticObjects());
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
      socket.removeAllListeners(API.MOUSE_RIGHT_CLICK);
      socket.removeAllListeners(API.UPDATE_DIRECTION);
      socket.leave(roomName);
    }
  }

  emitMessage(id: string, object: any) {
    this.socketIo.to(id).emit(API.MESSAGE, object);
  }

  emitMap(id: string, object: any) {
    this.socketIo.to(id).emit(API.SERIALIZE_MAP, object);
  }
}
