import TeamBattle from './TeamBattle';
import NewUser from '../../shared/apiModels/NewUser';
import Player from '../models/Player';
import playerService from '../services/PlayerService';

export default class RoundTeamBattle extends TeamBattle {
  maxTime: number;

  constructor(emitter, params) {
    super(emitter, params);
    this.teams.forEach((team, index) =>
      team.setZone(this.map.zones[index % this.map.zones.length]),
    );
  }

  startRound() {
    this.players.forEach(player => {
      const team = this.findTeam(player.team);
      const { x, y } = playerService.randNonCollisionPositionForZone(30, this, team.zone);
      player.setPosition(x,y);
      player.die(false);
    })
  }

  connectPlayer(newPlayer: NewUser): Player {
    const team = this.findTeam(newPlayer.team);
    const { x, y } = playerService.randNonCollisionPositionForZone(30, this, team.zone);
    const player = new Player(
      newPlayer.id,
      newPlayer.name,
      newPlayer.team,
      newPlayer.color,
      x,
      y,
      this.roomName,
    );
    this.players.push(player);
    return player;
  }
}
