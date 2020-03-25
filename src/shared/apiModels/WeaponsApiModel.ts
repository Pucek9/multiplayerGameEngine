export default interface WeaponsApiModel {
  selectedWeapon: {
    type: string;
    magazines: number;
    bulletsInMagazine: number;
    maxBulletsInMagazine: number;
    minTimeBetweenBullets: number;
    reloadTime: number;
    shootBulletsCount: number;
    id: number;
  };
  weapons: Array<{ type: string; id: number }>;
}
