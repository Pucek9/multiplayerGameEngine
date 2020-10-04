import { GameInstance, NewGame } from '../../shared/apiModels';
import { randColor } from '../../shared/helpers';
import { Team } from '../../shared/models';

import gameTypes from '../gameTypes';
import GameModel from '../gameTypes/GameModel';
import Cursors from './Cursor';
import GameMap from './GameMap';
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
        map: new GameMap(map),
      }),
    );
  }

  deleteGame(game: GameModel) {
    this.games.splice(this.games.indexOf(game), 1);
    game.steering = null;
    game.cursor = null;
    game.emitter = null;
    game.map = null;
    game.players = [];
    game.teams = [];
    game.bullets = [];
    clearInterval(game.interval as NodeJS.Timeout);
    clearInterval(game.customInterval as NodeJS.Timeout);
  }

  getGame(roomName: string): GameModel {
    return this.games.find(game => game.roomName === roomName);
  }

  getGameByPlayer(id: string): GameModel {
    return this.games.find(game => game.getPlayer(id));
  }

  getGamesList(): GameInstance[] {
    return this.games.map(game => {
      const { mapName, width, height, floor } = game.map;
      return {
        roomName: game.roomName,
        type: game.type,
        renderEngine: game.renderEngine,
        textures: game.textures,
        camera: game.camera,
        light: game.light,
        teams: game.teams,
        ip: game.ip,
        steering: game.steering.constructor.name,
        cursor: game.cursor.constructor.name,
        map: { mapName, width, height, floor },
        count: game.players.length,
      };
    });
  }
}

const gamesManager = new GamesManager();
export default gamesManager;
