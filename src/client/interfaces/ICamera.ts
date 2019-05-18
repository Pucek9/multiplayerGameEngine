import { PerspectiveCamera } from 'three';

export default interface ICamera {
  object: PerspectiveCamera;
  wheel(e: WheelEvent): void;
  update(any?): void;
  remove(): void;
}
