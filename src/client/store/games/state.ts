export interface GameState {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  count: number;
}

export interface GamesState {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  steering: string;
  bots: number;
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  camera: 'StaticCamera',
  light: 'FlashLight',
  steering: 'eightDirectionSteering',
  bots: 0,
  list: [],
};
