export enum TEXTURE {
  HEAD = 'HEAD',
  LEGS = 'LEGS',
  POINTER = 'POINTER',
  BOX = 'BOX',
  CUMIN = 'CUMIN',
  GRASS = 'GRASS',
  STADIUM_GRASS = 'STADIUM_GRASS',
  CIRCUIT_BOARD = 'CIRCUIT_BOARD',
}

// export enum TEXTURE {
//   HEAD = 'head.png',
//   LEGS = 'legs.png',
//   POINTER = 'pointer.png',
//   BOX = 'box.png',
//   CUMIN = 'cumin.jpg',
//   GRASS = 'grass.jpg',
//   STADIUM_GRASS = 'stadiumGrass.jpg',
//   CIRCUIT_BOARD = 'circuitBoard.jpg',
// }

// export enum TEXTURE3D {
//   HEAD = 'head3d.jpg',
//   LEGS = 'legs3d.png',
//   POINTER = 'pointer3d.png',
// }

export const renderMapping = {
  Canvas: '2d',
  Pixi: '2d',
  Three: '3d',
};

interface TextureChunkConfig {
  path?: string;
  textures?: {
    [key: string]: { fileName: string; scale?: number };
  };
  '2d'?: TextureChunkConfig;
  '3d'?: TextureChunkConfig;
}

interface TextureConfig {
  default?: TextureChunkConfig;
  [key: string]: TextureChunkConfig;
}

export const textureConfig: TextureConfig = {
  default: {
    path: 'default',
    textures: {
      BOX: { fileName: 'box.png' },
      CUMIN: { fileName: 'cumin.jpg' },
      GRASS: { fileName: 'grass.jpg' },
      STADIUM_GRASS: { fileName: 'stadiumGrass.jpg' },
      CIRCUIT_BOARD: { fileName: 'circuitBoard.jpg' },
    },
  },
  soldiers: {
    path: 'games/soldiers',
    '2d': {
      textures: {
        HEAD: { fileName: 'head.png', scale: 1.5 },
        LEGS: { fileName: 'legs.png' },
        POINTER: { fileName: 'pointer.png' },
      },
    },
    '3d': {
      textures: {
        HEAD: { fileName: 'head3d.jpg' },
        LEGS: { fileName: 'legs3d.png' },
        POINTER: { fileName: 'pointer3d.png' },
      },
    },
  },
  balls: {
    path: 'games/balls',
    '2d': {
      textures: {
        HEAD: { fileName: 'head.png' },
        LEGS: { fileName: 'legs.png' },
        POINTER: { fileName: 'pointer.png' },
      },
    },
    '3d': {
      textures: {
        HEAD: { fileName: 'head3d.jpg' },
        LEGS: { fileName: 'legs3d.png' },
        POINTER: { fileName: 'pointer3d.png' },
      },
    },
  },
};
