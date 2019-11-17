import Direction from '../models/Direction';

export default interface IObject {
  shape: string;
  x: number;
  y: number;
  direction: Direction;
}
