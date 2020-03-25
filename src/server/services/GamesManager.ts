import GameInstance from '../../shared/apiModels/GameInstance';
import NewGame from '../../shared/apiModels/NewGame';
import { randColor } from '../../shared/helpers';
import Team from '../../shared/models/Team';

import gameTypes from '../gameTypes';
import GameModel from '../gameTypes/GameModel';
import Cursors from './Cursor';
import Maps from './Maps';
import Steerings from './Steering';

class GamesManager {
  public games: GameModel[] = [];

  constructor() {}

  createGame(emitter, newGame: NewGame) {
    console.log(newGame);
    const { type, map, steering, cursor, teams } = newGame;
    this.games.push(
      new gameTypes[type](emitter, {
        ...newGame,
        teams: teams?.map(({ name, color }) => new Team({ name, color: color || randColor() })),
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
      const { mapName, width, height, floor } = game.map;
      return {
        roomName: game.roomName,
        type: game.type,
        map: { mapName, width, height, floor },
        camera: game.camera,
        light: game.light,
        count: game.players.length,
        teams: game.teams,
        ip: game.ip,
      };
    });
  }
}

const gamesManager = new GamesManager();
export default gamesManager;
