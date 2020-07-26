import { Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { CanvasRenderer } from '../engines/canvas/Game2D';
import CameraModel from './CameraModel';
export default interface ScreenModel {
  scene?: Scene;
  renderer: WebGLRenderer | CanvasRenderer;
  camera: CameraModel;
  composer?: EffectComposer;
}
