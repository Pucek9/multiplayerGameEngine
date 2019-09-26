import * as OptionsActions from './actions';
import { initialState, OptionsState } from './state';

export function optionsReducer(
  state: OptionsState = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
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
