import gameTypes from '../gameTypes';
import maps from '../maps';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';
import Steering from './Steering';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(
    steering: string,
    emitter,
    name: string,
    type: string,
    map: string,
    light: string,
    bots: number,
  ) {
    console.log(type, name, light, bots, map);
    this.games.push(
      new gameTypes[type](Steering[steering], emitter, name, light, bots, new maps[map]()),
    );
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
