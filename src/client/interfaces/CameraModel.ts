import Model3D from './Model3D';

export default interface CameraModel {
  object?;

  init(params: { observedObject: Model3D; renderer? }): void;

  wheel(e: WheelEvent): void;

  update(): void;

  remove(): void;

  handleResize(): void;
}
