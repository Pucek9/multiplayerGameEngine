import Power from '../models/Power';

export default interface PowersApiModel {
  selectedPower: Power;
  powers: Array<{
    type: string;
    id: number;
  }>;
  energy: number;
}
