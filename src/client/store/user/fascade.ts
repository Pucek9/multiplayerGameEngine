import { Store } from 'redux';
import * as JoinGameActions from './actions';
import { UserState } from './state';

export class UserService {
  constructor(public store: Store) {}

  setNick(nick: string) {
    this.store.dispatch({ type: JoinGameActions.SET_NICK, payload: nick });
  }

  setId(id: string) {
    this.store.dispatch({ type: JoinGameActions.SET_ID, payload: id });
  }

  chooseGame(chosenGame: string) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_GAME, payload: chosenGame });
  }
  chooseTeam(team: string) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_TEAM, payload: team });
  }

  getState(): UserState {
    return this.store.getState().user;
  }
}
