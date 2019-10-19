export interface GameState {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  count: number;
  teams?: Array<{
    name: string;
    count: number;
  }>;
}

export interface GamesState {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  steering: string;
  cursor: string;
  bots: number;
  list: GameState[];
  teams?: {
    count: number;
    list: string[];
  };
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  camera: 'StaticCamera',
  light: 'FlashLight',
  steering: 'eightDirectionSteering',
  cursor: 'freeCursor',
  bots: 0,
  list: [],
  teams: null,
};
