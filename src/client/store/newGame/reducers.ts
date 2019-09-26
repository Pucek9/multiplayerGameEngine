import * as GamesListActions from './actions';
import { initialState, NewGameState } from './state';

export function newGameReducer(state: NewGameState = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case GamesListActions.ADD_GAME:
      return {
        ...state,
        list: [...state.list, payload],
        roomName: '',
      };

    case GamesListActions.SET_GAME_NAME:
      return {
        ...state,
        roomName: payload,
      };

    case GamesListActions.SET_GAME_TYPE:
      return {
        ...state,
        type: payload,
      };

    case GamesListActions.SET_GAME_MAP:
      return {
        ...state,
        map: payload,
      };

    case GamesListActions.CLEAR_GAMES_LIST:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
}
