import { Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import ScreenModel from '../../interfaces/ScreenModel';
import { GameConfig } from '../../store/gamesList/state';
import { TextureService } from '../TextureService';
import Camera from './models/Camera';
import shaderService from './ShaderService';

export function prepareTreeJSScreen(gameConfig: GameConfig): ScreenModel {
  const scene = new Scene();
  const renderer = new WebGLRenderer({ antialias: true });
  const camera = new Camera[gameConfig.camera]();
  const texture = new TextureService(gameConfig.textures);

  renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
  renderer.autoClear = true;
  renderer.toneMappingExposure = Math.pow(0.68, 5.0); // to allow for very bright scenes.
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera.object);

  composer.addPass(renderPass);
  composer.addPass(shaderService.blendPass);
  composer.addPass(shaderService.savePass);
  composer.addPass(shaderService.outputPass);

  return {
    texture,
    scene,
    renderer,
    camera,
    composer,
  };
}
