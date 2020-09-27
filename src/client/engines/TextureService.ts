import { renderMapping, TEXTURE, textureConfig } from '../assets/textures';

export class TextureService {
  constructor(public game: string, public gameEngine: string) {}

  // async getTexture(texture: TEXTURE) {
  //   let file;
  //   try {
  //     file = await import(`../assets/textures/games/${this.game}/${texture}`);
  //   } catch (e) {
  //     console.warn(`Missing texture ../assets/textures/games/${this.game}/${texture}`);
  //     file = await import(`../assets/textures/default/${texture}`);
  //   }
  //   return file.default;
  // }

  async getTexture(texture: TEXTURE) {
    let file;
    const gameEngine = renderMapping[this.gameEngine];
    try {
      file = await this.getTexturePath(texture);
    } catch (e) {
      console.warn(
        `Missing configuration for texture ${texture} in ../assets/textures/${
          textureConfig[this.game].path
        }/`,
      );
      file = await this.getTexturePath(texture, 'default');
    }
    return file.default;
  }

  async getTexturePath(texture, game = this.game) {
    const config = textureConfig[game];
    const gameEngine = renderMapping[this.gameEngine];
    return await import(
      `../assets/textures/${config.path}/${
        config[gameEngine]?.textures?.[texture]?.fileName ?? config.textures?.[texture]?.fileName
      }`
    );
  }

  getScale(texture, game = this.game) {
    const config = textureConfig[game];
    const gameEngine = renderMapping[this.gameEngine];
    return config[gameEngine]?.textures?.[texture]?.scale ?? config.textures?.[texture]?.scale ?? 1;
  }
}
