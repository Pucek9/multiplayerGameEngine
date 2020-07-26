import { TEXTURE, TEXTURE3D } from '../assets/textures';

export class TextureService {
  gamePath: string;

  constructor(textures: string) {
    this.gamePath = textures;
  }

  // setTexture(img, texture: TEXTURE) {
  //   function setSrc(data) {
  //     img.src = data.default;
  //   }
  //
  //   const gamePath = this.gamePath;
  //   import(`../assets/textures/games/${gamePath}/${texture}`)
  //     .then(setSrc)
  //     .catch(() => {
  //       console.warn(`Missing texture ../assets/textures/games/${gamePath}/${texture}`);
  //       return import(`../assets/textures/default/${texture}`);
  //     })
  //     .then(setSrc)
  //     .catch(() => {
  //       console.warn(`Missing texture ../assets/textures/default/${texture}`);
  //     });
  // }

  async getTexture(texture: TEXTURE | TEXTURE3D) {
    const gamePath = this.gamePath;
    let path;
    try {
      path = await import(`../assets/textures/games/${gamePath}/${texture}`);
    } catch (e) {
      console.warn(`Missing texture ../assets/textures/games/${gamePath}/${texture}`);
      path = await import(`../assets/textures/default/${texture}`);
    }
    return path.default;
    //
    // import(`../assets/textures/games/${gamePath}/${texture}`)
    //     .then(setSrc)
    //     .catch(() => {
    //       console.warn(`Missing texture ../assets/textures/games/${gamePath}/${texture}`);
    //       return import(`../assets/textures/default/${texture}`);
    //     })
    //     .then(setSrc)
    //     .catch(() => {
    //       console.warn(`Missing texture ../assets/textures/default/${texture}`);
    //     });
  }
}
