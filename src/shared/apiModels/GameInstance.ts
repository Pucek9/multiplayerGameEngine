import MapModel from '../models/MapModel';

export default interface GameInstance {
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
