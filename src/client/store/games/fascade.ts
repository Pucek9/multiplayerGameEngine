import { Store } from 'redux';
import * as GamesListActions from './actions';
import { GamesState, GameState } from './state';

export class GamesService {
  constructor(public store: Store) {}

  addGame(payload: GameState) {
    this.store.dispatch({
      type: GamesListActions.ADD_GAME,
      payload: payload,
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

  setLight(light: string) {
    this.store.dispatch({
      type: GamesListActions.SET_LIGHT,
      payload: light,
    });
  }

  setSteering(steering: string) {
    this.store.dispatch({
      type: GamesListActions.SET_STEERING,
      payload: steering,
    });
  }

  setBotsCount(count: number) {
    this.store.dispatch({
      type: GamesListActions.SET_BOTS_COUNT,
      payload: count,
    });
  }

  clearGamesList() {
    this.store.dispatch({
      type: GamesListActions.CLEAR_GAMES_LIST,
    });
  }

  getState(): GamesState {
    return this.store.getState().games;
  }
}
