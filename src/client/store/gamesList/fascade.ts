import { Store } from 'redux';

import * as GamesListActions from './actions';
import { GameConfig, GamesListState } from './state';

export class GamesListService {
  constructor(public store: Store) {}

  addGame(payload: GameConfig) {
    this.store.dispatch({
      type: GamesListActions.ADD_GAME,
      payload: payload,
    });
  }

  clearGamesList() {
    this.store.dispatch({
      type: GamesListActions.CLEAR_GAMES_LIST,
    });
  }

  getState(): GamesListState {
    return this.store.getState().gamesList;
  }

  getGame(roomName: string): GameConfig {
    return this.getState().list.find(game => game.roomName === roomName);
  }
}
