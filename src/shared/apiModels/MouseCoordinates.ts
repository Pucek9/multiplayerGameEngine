export default interface MouseCoordinates {
  clientX: number;
  clientY: number;
  movementX?: number;
  movementY?: number;
  innerWidth?: number;
  innerHeight?: number;
  owner: string;
}
