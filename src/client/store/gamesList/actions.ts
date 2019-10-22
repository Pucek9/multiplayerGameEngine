export const ADD_GAME = 'ADD_GAME';
export const CLEAR_GAMES_LIST = 'CLEAR_GAMES_LIST';

export class AddGame {
  readonly type = ADD_GAME;

  constructor(public payload) {}
}

export class ClearGamesList {
  readonly type = CLEAR_GAMES_LIST;

  constructor() {}
}

export type GamesListActions = AddGame | ClearGamesList;
