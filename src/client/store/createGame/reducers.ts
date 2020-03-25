import { createArrayFilledValue } from '../../../shared/helpers';
import * as GamesActions from './actions';
import { CreateGameState, initialState } from './state';

export function createGameReducer(
  state: CreateGameState = initialState,
  { type, payload }: { type: string; payload: any },
) {
  switch (type) {
    case GamesActions.CLEAR_ROOM_NAME:
      return {
        ...state,
        roomName: '',
      };

    case GamesActions.SET_GAME_NAME:
      return {
        ...state,
        roomName: payload,
      };

    case GamesActions.SET_GAME_TYPE:
      return {
        ...state,
        type: payload,
      };

    case GamesActions.SET_TEAMS_COUNT:
      return {
        ...state,
        teams: {
          count: payload,
          list: createArrayFilledValue(payload, { name: '' }),
        },
      };

    case GamesActions.ENABLE_TEAMS:
      return {
        ...state,
        teams: {},
      };

    case GamesActions.DISABLE_TEAMS:
      return {
        ...state,
        teams: null,
      };

    case GamesActions.CLEAR_TEAMS:
      return {
        ...state,
        teams: {
          ...state.teams,
          list: [],
        },
      };

    case GamesActions.SET_TEAM_NAME:
      return {
        ...state,
        teams: {
          ...state.teams,
          list: state.teams.list.map((team, index) =>
            index === payload.index ? { name: payload.name } : team,
          ),
        },
      };

    case GamesActions.SET_GAME_MAP:
      return {
        ...state,
        map: payload,
      };

    case GamesActions.SET_LIGHT:
      return {
        ...state,
        light: payload,
      };

    case GamesActions.SET_CAMERA:
      return {
        ...state,
        camera: payload,
      };

    case GamesActions.SET_STEERING:
      return {
        ...state,
        steering: payload,
      };

    case GamesActions.SET_CURSOR:
      return {
        ...state,
        cursor: payload,
      };

    case GamesActions.SET_BOTS_COUNT:
      return {
        ...state,
        botsCount: payload,
      };
    //
    // case GamesActions.CLEAR_GAMES_LIST:
    //   return {
    //     ...state,
    //     list: [],
    //   };
    default:
      return state;
  }
}
