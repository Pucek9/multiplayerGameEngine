export interface UserState {
  nick: string;
  id: string;
  chosenGame: string;
  color?: string;
  team?: string;
}

export const initialState: UserState = {
  nick: '',
  id: null,
  chosenGame: null,
  color: null,
  team: null,
};
