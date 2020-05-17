import Updatable from '../../../interfaces/Updatable';

export default class Item implements Updatable {
  ready: boolean;
  time: number;
  id: number;

  update() {}
}
