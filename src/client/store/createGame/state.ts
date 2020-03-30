export interface CreateGameState {
  roomName: string;
  type: string;
  map: string;
  camera: string;
  light: string;
  steering: string;
  cursor: string;
  botsCount: number;
  teams?: {
    count: number;
    list: Array<{
      name: string;
    }>;
  };
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

// export const initialState: CreateGameState = {
//   roomName: '',
//   type: 'Free4all',
//   map: 'Playground',
//   camera: 'StaticCamera',
//   light: 'FlashLight',
//   steering: 'eightDirectionSteering',
//   cursor: 'freeCursor',
//   botsCount: 0,
//   teams: null,
// };

export const initialState: CreateGameState = {
  roomName: 'test',
  type: 'Free4all',
  map: 'Playground',
  camera: 'StaticCamera',
  light: 'AmbientLight',
  steering: 'eightDirectionSteering',
  cursor: 'freeCursor',
  botsCount: 5,
  teams: null,
};
