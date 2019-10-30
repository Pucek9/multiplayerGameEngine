import { Scene, WebGLRenderer } from 'three';
import ICamera from '../models/Camera/ICamera';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

export default interface ScreenModel {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: ICamera;
  composer: EffectComposer;
}
