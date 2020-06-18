import { GameInstance } from '../../../shared/apiModels/GameInstance';

export type GameConfig = GameInstance;

export interface GamesListState {
  list: GameConfig[];
}

export const initialState: GamesListState = {
  list: [],
};
