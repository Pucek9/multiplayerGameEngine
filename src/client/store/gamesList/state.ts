import MapModel from '../../../shared/models/MapModel';

export interface GameConfig {
  roomName: string;
  type: string;
  map: MapModel;
  camera: string;
  light: string;
  count: number;
  teams?: Array<{
    name: string;
    color: string;
    points: number;
    count: number;
  }>;
  ip: string;
}

export interface GamesListState {
  list: GameConfig[];
}

export const initialState: GamesListState = {
  list: [],
};
