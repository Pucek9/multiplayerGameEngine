import { Store } from 'redux';
import * as JoinGameActions from './actions';
import { JoinGameState } from './state';

export class JoinGameService {
  constructor(public store: Store<JoinGameState>) {}

  setNick(nick) {
    this.store.dispatch({ type: JoinGameActions.SET_NICK, payload: nick });
  }

  setId(id) {
    this.store.dispatch({ type: JoinGameActions.SET_NICK, payload: id });
  }

  chooseGame(chosenGame) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_GAME, payload: chosenGame });
  }

  // get() {
  //   return this.store.getState().joinGame;
  // }
}
