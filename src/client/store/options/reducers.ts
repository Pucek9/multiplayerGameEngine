import * as OptionsActions from './actions';
import { initialState, OptionsState } from './state';

export function optionsReducer(state: OptionsState = initialState, action) {
  const payload = action.payload;

  switch (action.payload) {
    case OptionsActions.SET_BLINKING:
      return {
        ...state,
        blinking: payload,
      };
    case OptionsActions.SET_BULLET_SHADOW:
      return {
        ...state,
        bulletShadow: payload,
      };
    default:
      return state;
  }
}
