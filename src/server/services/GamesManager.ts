import gameTypes from '../gameTypes';
import maps from '../maps';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(
    steering,
    emitter,
    name: string,
    type: string,
    map: string,
    light: string,
    bots: number,
  ) {
    console.log(type, name, light, bots, map);
    this.games.push(new gameTypes[type](steering, emitter, name, light, bots, new maps[map]()));
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
        light: game.light,
        count: game.players.length,
      };
    });
  }
}

const gamesManager = new GamesManager();
export default gamesManager;
