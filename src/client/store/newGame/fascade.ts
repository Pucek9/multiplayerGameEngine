import { Store } from 'redux';
import * as GamesListActions from './actions';
import { NewGameState } from './state';

export class GamesListService {
  constructor(public store: Store<NewGameState>) {}

  addGame(roomName: string, type: string, map: string, count: number) {
    this.store.dispatch({
      type: GamesListActions.ADD_GAME,
      payload: { roomName, type, map, count },
    });
  }

  setGameName(roomName: string) {
    this.store.dispatch({
      type: GamesListActions.SET_GAME_NAME,
      payload: roomName,
    });
  }

  setGameType(type: string) {
    this.store.dispatch({
      type: GamesListActions.SET_GAME_TYPE,
      payload: type,
    });
  }

  setGameMap(map: string) {
    this.store.dispatch({
      type: GamesListActions.SET_GAME_MAP,
      payload: map,
    });
  }

  clearGamesList() {
    this.store.dispatch({
      type: GamesListActions.CLEAR_GAMES_LIST,
    });
  }
}
