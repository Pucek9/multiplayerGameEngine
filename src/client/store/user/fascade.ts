import { Store } from 'redux';

import GameInstance from '../../../shared/apiModels/GameInstance';
import NewGame from '../../../shared/apiModels/NewGame';
import { GameConfig } from '../gamesList/state';
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

  setIp(ip: string) {
    this.store.dispatch({ type: JoinGameActions.SET_IP, payload: ip });
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

  selectTeam(teamName: string, chosenGame: GameConfig) {
    const chosenTeam = chosenGame.teams.find(team => team.name === teamName);
    this.chooseTeam(chosenTeam.name);
    this.chooseColor(chosenTeam.color);
  }

  getState(): UserState {
    return this.store.getState().user;
  }
}
