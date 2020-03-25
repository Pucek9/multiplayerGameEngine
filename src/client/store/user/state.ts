export interface UserState {
  nick: string;
  id: string;
  ip: string;
  chosenGame: string;
  color?: string;
  team?: string;
}

export const initialState: UserState = {
  nick: '',
  id: null,
  ip: null,
  chosenGame: null,
  color: null,
  team: null,
};
