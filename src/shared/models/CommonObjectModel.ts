import { Body, Circle, Polygon } from 'detect-collisions';

import { CIRCLE, POLYGON } from '../constants';
import { generateId } from '../helpers';
import { ObjectModel } from '../interfaces';
import { Item } from './Item';

export class CommonObjectModel implements ObjectModel, Item {
  id: number;
  type: string;
  z: number;
  depth: number;
  color: string;
  speed = 0;
  direction = { dx: 0, dy: 0 };
  body: Body;

  constructor(params: Partial<CommonObjectModel>) {
    this.id = params.id || generateId();
    switch (params.shape) {
      case CIRCLE: {
        this.body = new Circle(params.x, params.y, params.size);
        break;
      }
      case POLYGON: {
        this.body = new Polygon(params.x, params.y, params.points);
        break;
      }
    }
    Object.assign(this, params);
  }
}
