import { PhisicalObject } from './PhisicalObject';

export interface Rectangle extends PhisicalObject {
  width: number;
  height: number;
  deg: number;
}
