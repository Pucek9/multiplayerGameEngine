import { Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import ICamera from '../models/Camera/ICamera';
export default interface ScreenModel {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: ICamera;
  composer: EffectComposer;
}
