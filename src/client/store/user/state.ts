export interface UserState {
  nick: string;
  id: string;
  chosenGame: string;
  team?: string;
}

export const initialState: UserState = { nick: '', id: null, chosenGame: null, team: null };
