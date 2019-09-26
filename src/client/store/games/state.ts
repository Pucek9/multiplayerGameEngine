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
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4All',
  map: 'Playground',
  list: [],
};
