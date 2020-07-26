import { Action } from 'redux';

export const CLEAR_ROOM_NAME = 'CLEAR_ROOM_NAME';
export const SET_GAME_NAME = 'SET_GAME_NAME';
export const SET_GAME_TYPE = 'SET_GAME_TYPE';
export const SET_GAME_MAP = 'SET_GAME_MAP';
export const SET_TEXTURES = 'SET_TEXTURES';
export const SET_CAMERA = 'SET_CAMERA';
export const SET_RENDER_ENGINE = 'SET_RENDER_ENGINE';
export const SET_LIGHT = 'SET_LIGHT';
export const SET_STEERING = 'SET_STEERING';
export const SET_CURSOR = 'SET_CURSOR';
export const SET_BOTS_COUNT = 'SET_BOTS_COUNT';
export const CLEAR_TEAMS = 'CLEAR_TEAMS';
export const SET_TEAMS_COUNT = 'SET_TEAMS_COUNT';
export const SET_TEAM_NAME = 'SET_TEAM_NAME';
export const ENABLE_TEAMS = 'ENABLE_TEAMS';
export const DISABLE_TEAMS = 'DISABLE_TEAMS';

export class ClearRoomName implements Action {
  readonly type = CLEAR_ROOM_NAME;
}

export class SetGameName implements Action {
  readonly type = SET_GAME_NAME;

  constructor(public payload: string) {}
}

export class SetGameType implements Action {
  readonly type = SET_GAME_TYPE;

  constructor(public payload: string) {}
}

export class SetGameMap implements Action {
  readonly type = SET_GAME_MAP;

  constructor(public payload: string) {}
}

export class SetTextures implements Action {
  readonly type = SET_TEXTURES;

  constructor(public payload: string) {}
}

export class SetRenderEngine implements Action {
  readonly type = SET_RENDER_ENGINE;

  constructor(public payload: string) {}
}

export class SetCamera implements Action {
  readonly type = SET_CAMERA;

  constructor(public payload: string) {}
}

export class SetLight implements Action {
  readonly type = SET_LIGHT;

  constructor(public payload: string) {}
}

export class SetSteering implements Action {
  readonly type = SET_STEERING;

  constructor(public payload: string) {}
}

export class SetCursor implements Action {
  readonly type = SET_CURSOR;

  constructor(public payload: string) {}
}

export class SetBotsCount implements Action {
  readonly type = SET_BOTS_COUNT;

  constructor(public payload: number) {}
}

export class ClearTeams implements Action {
  readonly type = CLEAR_TEAMS;
}

export class EnableTeams implements Action {
  readonly type = ENABLE_TEAMS;
}

export class DisableTeams implements Action {
  readonly type = DISABLE_TEAMS;
}

export class SetTeamsCount implements Action {
  readonly type = SET_TEAMS_COUNT;

  constructor(public payload: number) {}
}

export class SetTeamName implements Action {
  readonly type = SET_TEAM_NAME;

  constructor(public payload: { index: number; name: string }) {}
}

// export class ClearGamesList {
//   readonly type = CLEAR_GAMES_LIST;
//
//   constructor() {}
// }

export type GamesActions =
  // | AddGame
  | SetGameName
  | SetGameType
  | SetGameMap
  | SetRenderEngine
  | SetCamera
  | SetLight
  | SetSteering
  | SetCursor
  | SetBotsCount
  // | ClearGamesList
  | ClearTeams
  | SetTeamsCount
  | SetTeamName
  | EnableTeams
  | DisableTeams;
