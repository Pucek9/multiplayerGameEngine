import gameTypes from '../gameTypes';
import GameInstance from '../../shared/apiModels/GameInstance';
import GameModel from '../gameTypes/GameModel';
import NewGame from '../../shared/apiModels/NewGame';
import Steerings from './Steering';
import Maps from './Maps';
import Cursors from './Cursor';
import Team from '../models/Team';
import { randColor } from '../../shared/helpers';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(emitter, newGame: NewGame) {
    console.log(newGame);
    const { type, map, steering, cursor, teams } = newGame;
    this.games.push(
      new gameTypes[type](emitter, {
        ...newGame,
        teams:
          teams?.map(({ name, color }) => new Team({ name, color: color || randColor() })),
        // teams && teams.map(name => new Team({ name, color: randColor() })),
        steering: Steerings[steering],
        cursor: Cursors[cursor],
        map: new Maps[map](),
      }),
    );
  }

  getGame(roomName: string): GameModel {
    return this.games.find(game => game.roomName === roomName);
  }

  getGameByPlayer(id: string): GameModel {
    return this.games.find(game => game.getPlayer(id));
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
        teams: game.teams,
      };
    });
  }
}

const gamesManager = new GamesManager();
export default gamesManager;
