import gameTypes from '../gameTypes';
import maps from '../maps';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';
import Steering from './Steering';
import Cursor from './Cursor';
import NewGame from '../../shared/apiModels/NewGame';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(emitter, newGame: NewGame) {
    const { roomName, type, camera, light, map, bots, steering, cursor } = newGame;
    console.log(roomName, type, camera, light, map, bots, steering, cursor);
    this.games.push(
      new gameTypes[type](
        Steering[steering],
        Cursor[cursor],
        emitter,
        new maps[map](),
        roomName,
        camera,
        light,
        bots,
      ),
    );
  }

  getGame(roomName: string) {
    return this.games.find(game => game.roomName === roomName);
  }

  getGameByPlayer(id: string) {
    return this.games.find(game => game.isPlayerInThisGame(id));
  }

  // getGamesList(): GameInstance[] {
  //   return this.games.map(game => ({ ...game, map: game.map.mapName, count: game.players.length }));
  // }

  getGamesList(): GameInstance[] {
    return this.games.map(game => {
      return {
        roomName: game.roomName,
        type: game.type,
        map: game.map.mapName,
        camera: game.camera,
        light: game.light,
        count: game.players.length,
      };
    });
  }
}

const gamesManager = new GamesManager();
export default gamesManager;
