export const ADD_GAME = 'ADD_GAME';
export const SET_GAME_NAME = 'SET_GAME_NAME';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const SET_GAME_MAP = 'SET_GAME_MAP';
export const SET_LIGHT = 'SET_LIGHT';
export const SET_BOTS_COUNT = 'SET_BOTS_COUNT';
export const CLEAR_GAMES_LIST = 'CLEAR_GAMES_LIST';

export class AddGame {
  readonly type = ADD_GAME;
  constructor(public payload) {}
}

export class SetGameName {
  readonly type = SET_GAME_NAME;
  constructor(public payload) {}
}

export class SetGameType {
  readonly type = SET_GAME_TYPE;
  constructor(public payload) {}
}

export class SetGameMap {
  readonly type = SET_GAME_MAP;
  constructor(public payload) {}
}

export class SetLight {
  readonly type = SET_LIGHT;
  constructor(public payload) {}
}

export class SetBotsCount {
  readonly type = SET_BOTS_COUNT;
  constructor(public payload) {}
}

export class ClearGamesList {
  readonly type = CLEAR_GAMES_LIST;
  constructor() {}
}

export type GamesActions = AddGame | SetGameName | SetGameType | SetGameMap | ClearGamesList;
