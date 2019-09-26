interface GameState {
  roomName: string;
  type: string;
  map: string;
}

export interface GamesState extends GameState {
  list: GameState[];
}

export const initialState: GamesState = {
  roomName: '',
  type: 'Free4All',
  map: 'Playground',
  list: [],
};
