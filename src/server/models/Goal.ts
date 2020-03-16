import StaticRectangleObject from './StaticRectangleObject';

export default class Goal extends StaticRectangleObject {
  team: string;

  constructor(params: Partial<Goal>) {
    super(params);
  }
}
