import { Power } from '../../../shared/models';

export default abstract class Aura extends Power {
  abstract effect(props: any);

  abstract isActive(): boolean;

  abstract getSize(): number;
}
