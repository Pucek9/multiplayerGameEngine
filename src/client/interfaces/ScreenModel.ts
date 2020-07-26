import { Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { CanvasRenderer } from '../engines/canvas/Game2D';
import { TextureService } from '../engines/TextureService';
import CameraModel from './CameraModel';
export default interface ScreenModel {
  texture: TextureService;
  scene?: Scene;
  renderer: WebGLRenderer | CanvasRenderer;
  camera: CameraModel;
  composer?: EffectComposer;
}
