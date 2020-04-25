import * as GamesActions from './actions';
import { GamesListState, initialState } from './state';

export function gamesListReducer(
  state: GamesListState = initialState,
  { type, payload }: { type: string; payload },
) {
  switch (type) {
    case GamesActions.ADD_GAME:
      return {
        ...state,
        list: [...state.list, payload],
      };

    case GamesActions.CLEAR_GAMES_LIST:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
}
