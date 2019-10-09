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
  steering: string;
  bots: number;
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  light: 'FlashLight',
  steering: 'eightDirectionSteering',
  bots: 0,
  list: [],
};
