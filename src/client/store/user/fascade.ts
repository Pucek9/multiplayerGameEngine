import { Store } from 'redux';
import * as JoinGameActions from './actions';
import { UserState } from './state';

export class UserService {
  constructor(public store: Store) {}

  setNick(nick) {
    this.store.dispatch({ type: JoinGameActions.SET_NICK, payload: nick });
  }

  setId(id) {
    this.store.dispatch({ type: JoinGameActions.SET_ID, payload: id });
  }

  chooseGame(chosenGame) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_GAME, payload: chosenGame });
  }

  getState(): UserState {
    return this.store.getState().user;
  }
}
