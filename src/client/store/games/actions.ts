export const ADD_GAME = 'ADD_GAME';
export const SET_GAME_NAME = 'SET_GAME_NAME';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const SET_GAME_MAP = 'SET_GAME_MAP';
export const SET_CAMERA = 'SET_CAMERA';
export const SET_LIGHT = 'SET_LIGHT';
export const SET_STEERING = 'SET_STEERING';
export const SET_CURSOR = 'SET_CURSOR';
export const SET_BOTS_COUNT = 'SET_BOTS_COUNT';
export const CLEAR_GAMES_LIST = 'CLEAR_GAMES_LIST';
export const CLEAR_TEAMS = 'CLEAR_TEAMS';
export const SET_TEAMS_COUNT = 'SET_TEAMS_COUNT';
export const SET_TEAM_NAME = 'SET_TEAM_NAME';
export const ENABLE_TEAMS = 'ENABLE_TEAMS';
export const DISABLE_TEAMS = 'DISABLE_TEAMS';

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

export class SetCamera {
  readonly type = SET_CAMERA;

  constructor(public payload) {}
}

export class SetLight {
  readonly type = SET_LIGHT;

  constructor(public payload) {}
}

export class SetSteering {
  readonly type = SET_STEERING;

  constructor(public payload) {}
}

export class SetCursor {
  readonly type = SET_CURSOR;

  constructor(public payload) {}
}

export class SetBotsCount {
  readonly type = SET_BOTS_COUNT;

  constructor(public payload: number) {}
}

export class ClearTeams {
  readonly type = CLEAR_TEAMS;
}

export class EnableTeams {
  readonly type = ENABLE_TEAMS;

  constructor() {}
}

export class DisableTeams {
  readonly type = DISABLE_TEAMS;

  constructor() {}
}

export class SetTeamsCount {
  readonly type = SET_TEAMS_COUNT;

  constructor(public payload: number) {}
}

export class SetTeamName {
  readonly type = SET_TEAM_NAME;

  constructor(public payload: { index: number; name: string }) {}
}

export class ClearGamesList {
  readonly type = CLEAR_GAMES_LIST;

  constructor() {}
}

export type GamesActions =
  | AddGame
  | SetGameName
  | SetGameType
  | SetGameMap
  | SetCamera
  | SetLight
  | SetSteering
  | SetCursor
  | SetBotsCount
  | ClearGamesList
  | ClearTeams
  | SetTeamsCount
  | SetTeamName
  | EnableTeams
  | DisableTeams;
