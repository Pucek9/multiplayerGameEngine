import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export default interface ScreenModel {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
}
