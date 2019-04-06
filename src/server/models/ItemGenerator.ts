import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';

interface ParameterlessConstructor<T> {
  new (): T;
}

export default class ItemGenerator<T> extends StaticCircularObjectModel {
  ready = true;
  weapon: ParameterlessConstructor<T>;
  time: number;

  constructor(params: Partial<ItemGenerator<T>>) {
    super(params);
    Object.assign(this, params);
    Object.seal(this);
  }

  isReady() {
    return this.ready;
  }

  generateWeapon(): T {
    if (this.isReady()) {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, this.time);
      return new this.weapon();
    }
  }
}
