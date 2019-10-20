import * as UserActions from './actions';
import { initialState, UserState } from './state';

export function userReducer(
  state: UserState = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case UserActions.SET_NICK:
      return {
        ...state,
        nick: payload,
      };
    case UserActions.SET_ID:
      return {
        ...state,
        id: payload,
      };
    case UserActions.CHOOSE_GAME:
      return {
        ...state,
        chosenGame: payload,
      };
    case UserActions.CHOOSE_TEAM:
      return {
        ...state,
        team: payload,
      };
    default:
      return state;
  }
}
