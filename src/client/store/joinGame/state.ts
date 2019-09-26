export interface JoinGameState {
  nick: string;
  id: string;
  chosenGame: string;
}

export const initialState: JoinGameState = { nick: '', id: null, chosenGame: null };
