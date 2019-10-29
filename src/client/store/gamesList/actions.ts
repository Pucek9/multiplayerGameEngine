import { Action } from 'redux';
import { GameConfig } from './state';

export const ADD_GAME = 'ADD_GAME';
export const CLEAR_GAMES_LIST = 'CLEAR_GAMES_LIST';

export class AddGame implements Action {
  readonly type = ADD_GAME;

  constructor(public payload: GameConfig) {}
}

export class ClearGamesList implements Action {
  readonly type = CLEAR_GAMES_LIST;
}

export type GamesListActions = AddGame | ClearGamesList;
