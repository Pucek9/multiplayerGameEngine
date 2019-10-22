import { Store } from 'redux';
import * as JoinGameActions from './actions';
import { UserState } from './state';
import { GameConfig } from '../gamesList/state';
import NewGame from '../../../shared/apiModels/NewGame';
import GameInstance from '../../../shared/apiModels/GameInstance';

export class UserService {
  constructor(public store: Store) {}

  setNick(nick: string) {
    this.store.dispatch({ type: JoinGameActions.SET_NICK, payload: nick });
  }

  setId(id: string) {
    this.store.dispatch({ type: JoinGameActions.SET_ID, payload: id });
  }

  chooseGame(roomName: string) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_GAME, payload: roomName });
  }

  chooseTeam(team: string) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_TEAM, payload: team });
  }

  chooseColor(color: string) {
    this.store.dispatch({ type: JoinGameActions.CHOOSE_COLOR, payload: color });
  }

  selectGame(chosenGame: GameConfig | NewGame | GameInstance) {
    this.chooseGame(chosenGame.roomName);
    const teams = chosenGame.teams;
    if (teams) {
      const chosenTeam = teams.reduce((res, obj) => (obj.count < res.count ? obj : res));
      this.chooseTeam(chosenTeam.name);
      this.chooseColor(chosenTeam.color);
    }
  }

  selectTeam(teamName: string, chosenGame) {
    const chosenTeam = chosenGame.teams.find(team => team.name === teamName);
    this.chooseTeam(chosenTeam.name);
    this.chooseColor(chosenTeam.color);
  }

  getState(): UserState {
    return this.store.getState().user;
  }
}
