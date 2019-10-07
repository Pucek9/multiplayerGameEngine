interface GameState {
  roomName: string;
  type: string;
  map: string;
  count: number;
}

export interface GamesState {
  roomName: string;
  type: string;
  map: string;
  bots: number;
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  bots: 0,
  list: [],
};
