import gameTypes from '../gameTypes';
import maps from '../maps';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';

export default class GamesStore {
  public games: GameModel[] = [];

  constructor() {}

  createGame(main, name: string, type: string, map: string) {
    this.games.push(new gameTypes[type](main, name, new maps[map]()));
  }

  getGame(roomName: string) {
    return this.games.find(game => game.roomName === roomName);
  }

  getGameByPlayer(id: string) {
    return this.games.find(game => game.isPlayerInThisGame(id));
  }

  getGamesList(): GameInstance[] {
    return this.games.map(game => {
      return {
        roomName: game.roomName,
        type: game.type,
        map: game.map.mapName,
        count: game.players.length,
      };
    });
  }
}
