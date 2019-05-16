import { PerspectiveCamera } from 'three';

export default interface ICamera {
  camera: PerspectiveCamera;
  wheel(e: WheelEvent): void;
  update(any?): void;
  remove(): void;
}
