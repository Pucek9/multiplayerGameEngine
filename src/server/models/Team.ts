export default class Team {
  public name: string;
  public points = 0;
  constructor(params: Partial<Team>) {
    Object.assign(this, params);
    Object.seal(this);
  }
}
