export interface GameState {
  roomName: string;
  type: string;
  map: string;
  light: string;
  count: number;
}

export interface GamesState {
  roomName: string;
  type: string;
  map: string;
  light: string;
  bots: number;
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  light: 'FlashLight',
  bots: 0,
  list: [],
};
