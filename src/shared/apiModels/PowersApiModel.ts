import { Power } from '../models';

export interface PowersApiModel {
  selectedPower: Power;
  powers: Array<{
    type: string;
    id: number;
  }>;
  energy: number;
}
