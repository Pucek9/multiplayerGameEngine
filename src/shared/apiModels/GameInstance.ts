import { MapModel } from '../models';

export interface GameInstance {
  roomName: string;
  type: string;
  map: MapModel;
  textures: string;
  steering: string;
  cursor: string;
  renderEngine: string;
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
