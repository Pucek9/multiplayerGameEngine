export interface NewGame {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  textures: string;
  steering: string;
  renderEngine: string;
  cursor: string;
  botsCount: number;
  teams?: Array<{
    name: string;
    color: string;
  }>;
  ip?: string;
}
