import * as JoinGameActions from './actions';
import { initialState, JoinGameState } from './state';

export function joinGameReducer(
  state: JoinGameState = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case JoinGameActions.SET_NICK:
      return {
        ...state,
        nick: payload,
      };
    case JoinGameActions.SET_ID:
      return {
        ...state,
        id: payload,
      };
    case JoinGameActions.CHOOSE_GAME:
      return {
        ...state,
        chosenGame: payload,
      };
    default:
      return state;
  }
}
