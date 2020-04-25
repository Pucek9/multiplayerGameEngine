import Zone from '../../server/models/Zone';

export class Team {
  public points = 0;
  public count = 0;
  public name: string;
  public color: string;
  public zone: Zone;
  constructor({ name, color }: { name: string; color: string }) {
    this.name = name;
    this.color = color;
  }

  setZone(zone: Zone): void {
    this.zone = zone;
  }

  increasePoints() {
    this.points += 1;
  }

  decreasePoints() {
    this.points -= 1;
  }

  joinToTeam() {
    this.count += 1;
  }

  leaveTeam() {
    this.count -= 1;
  }
}
