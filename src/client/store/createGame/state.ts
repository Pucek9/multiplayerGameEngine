export interface CreateGameState {
  roomName: string;
  type: string;
  teams?: {
    count: number;
    list: Array<{
      name: string;
    }>;
  };
  botsCount: number;
  map: string;
  renderEngine: string;
  camera: string;
  light: string;
  steering: string;
  cursor: string;
}

// export const initialState: CreateGameState = {
//   roomName: 'room',
//   type: 'Haxball',
//   map: 'Stadium',
//   camera: 'StaticCamera',
//   light: 'AmbientLight',
//   steering: 'eightDirectionSteering',
//   cursor: 'freeCursor',
//   botsCount: 0,
//   teams: {
//     count: 2,
//     list: [{ name: 'a' }, { name: 'b' }],
//   },
// };

export const initialState: CreateGameState = {
  roomName: '',
  type: 'Free4all',
  map: 'Playground',
  botsCount: 0,
  teams: null,
  renderEngine: 'Three',
  camera: 'StaticCamera',
  light: 'AmbientLight',
  steering: 'eightDirectionSteering',
  cursor: 'freeCursor',
};
