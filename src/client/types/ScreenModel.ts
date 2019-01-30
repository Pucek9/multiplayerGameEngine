import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export interface ScreenModel {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
}
