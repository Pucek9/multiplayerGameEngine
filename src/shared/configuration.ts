import {
  ACCELELATOR,
  AIM,
  AK47,
  AMBIENT_LIGHT,
  AROUND_CURSOR,
  BOXES,
  CAR_INDEPENDENT_STEERING,
  CAR_STEERING,
  CURSOR_LIGHT,
  DYNAMIC_CAMERA,
  EIGHT_DIRECTION_STEERING,
  FLASH_LIGHT,
  FREE_CURSOR,
  FREE4ALL,
  GRENADE,
  HAXBALL,
  HEAL,
  INCREASER,
  KNIFE,
  LAND_MINE,
  LEGS,
  NO_CURSOR,
  PISTOL,
  PLAYGROUND,
  PULL,
  PUSH,
  RESIZER,
  REVERSE_BULLETS,
  ROTATE_STEERING,
  ROUND_TEAM_BATTLE,
  SHOTGUN,
  SLOW_BULLETS,
  STADIUM,
  STATIC_CAMERA,
  SUPER_AIM,
  TEAM_BATTLE,
  TELEPORT,
} from './constants';

export enum Configs {
  ROOM_NAME = 'roomName',
  TYPE = 'type',
  PLAYER_COLOR = 'playerColor',
  WEAPONS_MODE = 'weaponsMode',
  WEAPONS_COUNT = 'weaponsCount',
  WEAPONS = 'weapons',
  POWERS_MODE = 'powersMode',
  POWERS_COUNT = 'powersCount',
  POWERS = 'powers',
  MAP = 'map',
  LIGHT = 'light',
  CAMERA = 'camera',
  STEERING = 'steering',
  CURSOR = 'cursor',
  BOTS = 'bots',
  TEAMS = 'teams',
  TEAMS_COUNT = 'teamsCount',
  TEAMS_COLORS = 'teamsColor',
  FRIENDLY_FIRE = 'friendlyFire',
  MAX_ROUND = 'maxRound',
  MAX_ROUND_TIME = 'maxRoundTime',
  MAX_TIME = 'maxTime',
  ALLOW_FOR_STATIC_ROTATE = 'allowForStaticRotate',
  SENSIVITY = 'sensivity',
  RANGE = 'range',
}

export enum Mode {
  RANDOM_ONE = 'RANDOM_ONE',
  CHOSEN = 'CHOSEN',
  CHOOSABLE = 'CHOOSABLE',
}

export enum ConfigType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  MULTIPLE_SELECT = 'multipleSelect',
  TAGS = 'tags',
  COLOR = 'color',
  BOOLEAN = 'boolean',
}

export interface OptionSelector {
  option: Configs;
  values: Array<string>;
}

export interface ConfigSelector {
  config: Configs;
}

export interface Config {
  name: Configs | string;
  type: ConfigType;
  values?: Array<Option | Mode>;
  defaultValue: any;
}

export interface Option {
  name: string;
  configuration?: Config[];
  disabled?: Array<ConfigSelector | OptionSelector>;
  enabled?: Array<ConfigSelector | OptionSelector>;
}

export const gameConfiguration: Config[] = [
  {
    name: Configs.ROOM_NAME,
    type: ConfigType.TEXT,
    defaultValue: '',
  },
  {
    name: Configs.TYPE,
    type: ConfigType.SELECT,
    defaultValue: FREE4ALL,
    values: [
      {
        name: FREE4ALL,
        disabled: [
          { config: Configs.TEAMS },
          { config: Configs.TEAMS_COUNT },
          { config: Configs.TEAMS_COLORS },
          { option: Configs.WEAPONS, values: [LEGS] },
        ],
      },
      {
        name: TEAM_BATTLE,
        disabled: [{ option: Configs.WEAPONS, values: [LEGS] }, { config: Configs.PLAYER_COLOR }],
        configuration: [
          {
            name: Configs.FRIENDLY_FIRE,
            type: ConfigType.BOOLEAN,
            defaultValue: false,
          },
        ],
      },
      {
        name: ROUND_TEAM_BATTLE,
        disabled: [{ option: Configs.WEAPONS, values: [LEGS] }, { config: Configs.PLAYER_COLOR }],
        configuration: [
          {
            name: Configs.FRIENDLY_FIRE,
            type: ConfigType.BOOLEAN,
            defaultValue: false,
          },
          {
            name: Configs.MAX_ROUND,
            type: ConfigType.NUMBER,
            defaultValue: 5,
          },
          {
            name: Configs.MAX_ROUND_TIME,
            type: ConfigType.NUMBER,
            defaultValue: 5 * 60 * 1000,
          },
          {
            name: Configs.MAX_TIME,
            type: ConfigType.NUMBER,
            defaultValue: 60 * 60 * 1000,
          },
        ],
      },
      {
        name: HAXBALL,
        enabled: [{ option: Configs.WEAPONS, values: [LEGS] }],
        disabled: [{ config: Configs.PLAYER_COLOR }],
        configuration: [
          {
            name: Configs.MAX_ROUND,
            type: ConfigType.NUMBER,
            defaultValue: 5,
          },
          {
            name: Configs.MAX_ROUND_TIME,
            type: ConfigType.NUMBER,
            defaultValue: 5 * 60 * 1000,
          },
          {
            name: Configs.MAX_TIME,
            type: ConfigType.NUMBER,
            defaultValue: 60 * 60 * 1000,
          },
        ],
      },
    ],
  },
  {
    name: Configs.PLAYER_COLOR,
    type: ConfigType.COLOR,
    values: [Mode.RANDOM_ONE, Mode.CHOOSABLE],
    defaultValue: Mode.RANDOM_ONE,
  },
  {
    name: Configs.WEAPONS_MODE,
    type: ConfigType.SELECT,
    values: [Mode.RANDOM_ONE, Mode.CHOSEN, Mode.CHOOSABLE],
    defaultValue: Mode.RANDOM_ONE,
  },
  {
    name: Configs.WEAPONS_COUNT,
    type: ConfigType.NUMBER,
    defaultValue: 1,
  },
  {
    name: Configs.WEAPONS,
    type: ConfigType.MULTIPLE_SELECT,
    values: [
      { name: AK47 },
      { name: GRENADE },
      { name: KNIFE },
      { name: LAND_MINE },
      { name: PISTOL },
      { name: RESIZER },
      { name: SHOTGUN },
      { name: LEGS },
    ],
    defaultValue: [KNIFE],
  },
  {
    name: Configs.POWERS_MODE,
    type: ConfigType.SELECT,
    values: [Mode.RANDOM_ONE, Mode.CHOSEN, Mode.CHOOSABLE],
    defaultValue: Mode.RANDOM_ONE,
  },
  {
    name: Configs.POWERS_COUNT,
    type: ConfigType.NUMBER,
    defaultValue: 1,
  },
  {
    name: Configs.POWERS,
    type: ConfigType.MULTIPLE_SELECT,
    values: [
      { name: ACCELELATOR },
      { name: AIM },
      { name: HEAL },
      { name: INCREASER },
      { name: PULL },
      { name: PUSH },
      { name: REVERSE_BULLETS },
      { name: SLOW_BULLETS },
      { name: SUPER_AIM },
      { name: TELEPORT },
    ],
    defaultValue: [],
  },
  {
    name: Configs.MAP,
    type: ConfigType.SELECT,
    values: [{ name: PLAYGROUND }, { name: BOXES }, { name: STADIUM }],
    defaultValue: PLAYGROUND,
  },
  {
    name: Configs.LIGHT,
    type: ConfigType.SELECT,
    values: [{ name: AMBIENT_LIGHT }, { name: CURSOR_LIGHT }, { name: FLASH_LIGHT }],
    defaultValue: AMBIENT_LIGHT,
  },
  {
    name: Configs.CAMERA,
    type: ConfigType.SELECT,
    values: [
      { name: STATIC_CAMERA },
      {
        name: DYNAMIC_CAMERA,
        disabled: [
          { option: Configs.CURSOR, values: [FREE_CURSOR] },
          { option: Configs.STEERING, values: [EIGHT_DIRECTION_STEERING] },
        ],
      },
    ],
    defaultValue: DYNAMIC_CAMERA,
  },
  {
    name: Configs.STEERING,
    type: ConfigType.SELECT,
    values: [
      {
        name: CAR_INDEPENDENT_STEERING,
        disabled: [{ option: Configs.CURSOR, values: [NO_CURSOR] }],
        configuration: [
          {
            name: Configs.ALLOW_FOR_STATIC_ROTATE,
            type: ConfigType.BOOLEAN,
            defaultValue: true,
          },
          {
            name: Configs.SENSIVITY,
            type: ConfigType.NUMBER,
            defaultValue: 0.5,
          },
        ],
      },
      {
        name: CAR_STEERING,
        configuration: [
          {
            name: Configs.ALLOW_FOR_STATIC_ROTATE,
            type: ConfigType.BOOLEAN,
            defaultValue: true,
          },
          {
            name: Configs.SENSIVITY,
            type: ConfigType.NUMBER,
            defaultValue: 0.5,
          },
          {
            name: Configs.RANGE,
            type: ConfigType.NUMBER,
            defaultValue: 200,
          },
        ],
      },
      {
        name: EIGHT_DIRECTION_STEERING,
        disabled: [{ option: Configs.CURSOR, values: [NO_CURSOR] }],
      },
      { name: ROTATE_STEERING, disabled: [{ option: Configs.CURSOR, values: [NO_CURSOR] }] },
    ],
    defaultValue: EIGHT_DIRECTION_STEERING,
  },
  {
    name: Configs.CURSOR,
    type: ConfigType.SELECT,
    values: [
      {
        name: AROUND_CURSOR,
        configuration: [
          {
            name: Configs.SENSIVITY,
            type: ConfigType.NUMBER,
            defaultValue: 100,
          },
          {
            name: Configs.RANGE,
            type: ConfigType.NUMBER,
            defaultValue: 200,
          },
        ],
      },
      { name: FREE_CURSOR },
      { name: NO_CURSOR },
    ],
    defaultValue: FREE_CURSOR,
  },
  {
    name: Configs.BOTS,
    type: ConfigType.NUMBER,
    defaultValue: 0,
  },
  {
    name: Configs.TEAMS_COUNT,
    type: ConfigType.NUMBER,
    defaultValue: 0,
  },
  {
    name: Configs.TEAMS,
    type: ConfigType.TAGS,
    defaultValue: [],
  },
  {
    name: Configs.TEAMS_COLORS,
    type: ConfigType.TAGS,
    defaultValue: [],
  },
];
