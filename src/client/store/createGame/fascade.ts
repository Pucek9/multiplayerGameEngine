import { Store } from 'redux';
import * as GamesListActions from './actions';
import { CreateGameState } from './state';

export class CreateGamesService {
  constructor(public store: Store) {}

  clearRoomName() {
    this.store.dispatch({
      type: GamesListActions.CLEAR_ROOM_NAME,
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

  setCamera(map: string) {
    this.store.dispatch({
      type: GamesListActions.SET_CAMERA,
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

  setCursor(cursor: string) {
    this.store.dispatch({
      type: GamesListActions.SET_CURSOR,
      payload: cursor,
    });
  }

  setBotsCount(count: number) {
    this.store.dispatch({
      type: GamesListActions.SET_BOTS_COUNT,
      payload: count,
    });
  }
  //
  // clearGamesList() {
  //   this.store.dispatch({
  //     type: GamesListActions.CLEAR_GAMES_LIST,
  //   });
  // }

  clearTeamsList() {
    this.store.dispatch({
      type: GamesListActions.CLEAR_TEAMS,
    });
  }

  setTeamsCount(count: number) {
    this.store.dispatch({
      type: GamesListActions.SET_TEAMS_COUNT,
      payload: count,
    });
  }

  setTeamName(index, name) {
    this.store.dispatch({
      type: GamesListActions.SET_TEAM_NAME,
      payload: { index, name },
    });
  }

  enableTeams() {
    this.store.dispatch({
      type: GamesListActions.ENABLE_TEAMS,
    });
  }

  disableTeams() {
    this.store.dispatch({
      type: GamesListActions.DISABLE_TEAMS,
    });
  }

  getState(): CreateGameState {
    return this.store.getState().createGame;
  }

  getNormalizedState() {
    const { teams, ...props } = this.store.getState().createGame;
    return { teams: teams && teams.list, ...props };
  }
}
