import gameTypes from '../gameTypes';
import maps from '../maps';

export default class GamesStore {
  public games: any[] = [];

  constructor() {}

  createGame(name: string, type: string, map: string) {
    this.games.push(new gameTypes[type](name, maps[map]));
  }

  getGame(name: string) {
    return this.games.find(game => game.name === name);
  }

  getGameByPlayer(id: number) {
    return this.games.find(game => game.isPlayerInThisGame(id));
  }

  getGamesList() {
    // console.log('this.games', this.games)
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
