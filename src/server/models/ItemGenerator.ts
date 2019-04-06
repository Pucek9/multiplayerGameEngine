import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';

interface ParameterlessConstructor<Weapon> {
  new (): Weapon;
}

export default class ItemGenerator<Weapon> extends StaticCircularObjectModel {
  private ready = true;
  weapon: ParameterlessConstructor<Weapon>;
  time: number;

  constructor(params: Partial<ItemGenerator<Weapon>>) {
    super(params);
    Object.assign(this, params);
    Object.seal(this);
  }

  isReady() {
    return this.ready;
  }

  generateWeapon() {
    if (this.ready) {
      this.ready = false;
      console.log('bf', this.ready);
      setTimeout(() => {
        console.log('in', this.ready);
        this.ready = true;
        console.log('af', this.ready);
      }, this.time);
      return new this.weapon();
    }
  }
}
