export default interface NewGame {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  steering: string;
  cursor: string;
  botsCount: number;
  teams?: Array<{
    name: string;
    color: string;
  }>;
  ip?: string;
}
