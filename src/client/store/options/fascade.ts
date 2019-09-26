import { Store } from 'redux';
import * as OptionsActions from './actions';
import { OptionsState } from './state';

export class OptionsService {
  constructor(public store: Store) {}

  setBlinking(value) {
    this.store.dispatch({ type: OptionsActions.SET_BLINKING, payload: value });
  }

  setBulletShadow(value) {
    this.store.dispatch({ type: OptionsActions.SET_BULLET_SHADOW, payload: value });
  }

  getState(): OptionsState {
    return this.store.getState().options;
  }
}
