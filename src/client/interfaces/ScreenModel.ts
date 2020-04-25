import { Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import CameraModel from '../models/Camera/CameraModel';
export default interface ScreenModel {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: CameraModel;
  composer: EffectComposer;
}
