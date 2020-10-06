import RectangleObject from './RectangleObject';

export default class Goal extends RectangleObject {
  team: string;

  constructor(params: Partial<Goal>) {
    super(params);
  }
}
