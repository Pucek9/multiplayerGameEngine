import gameTypes from '../gameTypes';
import maps from '../maps';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(steering, emitter, name: string, type: string, map: string, bots: number) {
    console.log(type, name, bots, map);
    this.games.push(new gameTypes[type](steering, emitter, name, bots, new maps[map]()));
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

const gamesManager = new GamesManager();
export default gamesManager;
