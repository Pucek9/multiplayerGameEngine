export interface UserState {
  nick: string;
  id: string;
  chosenGame: string;
}

export const initialState: UserState = { nick: '', id: null, chosenGame: null };
