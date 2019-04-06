import gameTypes from '../gameTypes';
import maps from '../maps';
import GameItem from '../../shared/apiModels/GameItem';
import GameModel from '../gameTypes/GameModel';

export default class GamesStore {
  public games: GameModel[] = [];

  constructor() {}

  createGame(main, name: string, type: string, map: string) {
    this.games.push(new gameTypes[type](main, name, new maps[map]()));
  }

  getGame(name: string) {
    return this.games.find(game => game.name === name);
  }

  getGameByPlayer(id: string) {
    return this.games.find(game => game.isPlayerInThisGame(id));
  }

  getGamesList(): GameItem[] {
    return this.games.map(game => {
      return {
        name: game.name,
        type: game.type,
        map: game.map.mapName,
        count: game.players.length,
      };
    });
  }
}
