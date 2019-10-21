export interface GameConfig {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  count: number;
  teams?: Array<{
    name: string;
    points: number;
    count: number;
  }>;
}

export interface GamesListState {
  list: GameConfig[];
}

export const initialState: GamesListState = {
  list: [],
};
