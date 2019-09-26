export interface NewGameState {
  roomName: string;
  type: string;
  map: string;
  list: [];
}

export const initialState: NewGameState = {
  roomName: '',
  type: 'Free4All',
  map: 'Playground',
  list: [],
};
