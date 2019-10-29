import { Action } from 'redux';

export const SET_NICK = 'SET_NICK';
export const SET_ID = 'SET_ID';
export const CHOOSE_GAME = 'CHOOSE_GAME';
export const CHOOSE_TEAM = 'CHOOSE_TEAM';
export const CHOOSE_COLOR = 'CHOOSE_COLOR';

export class SetNick implements Action {
  readonly type = SET_NICK;

  constructor(public payload: string) {}
}

export class SetId implements Action {
  readonly type = SET_ID;

  constructor(public payload: string) {}
}

export class ChooseGame implements Action {
  readonly type = CHOOSE_GAME;

  constructor(public payload: string) {}
}

export class ChooseTeam implements Action {
  readonly type = CHOOSE_TEAM;

  constructor(public payload: string) {}
}

export type UserActions = SetNick | SetId | ChooseGame;
