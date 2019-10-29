import { compareBy } from '../../shared/helpers';
import PlayerListModel from '../interfaces/PlayerListModel';
import Team from '../../shared/models/Team';

declare var teamsPlayersListPanel: HTMLUListElement;

export default class TeamPlayerListComponent {
  constructor() {}

  show() {
    teamsPlayersListPanel.style.display = 'block';
  }

  hide() {
    teamsPlayersListPanel.style.display = 'none';
  }

  update(players: Array<PlayerListModel>, teams: Array<Team>) {
    teamsPlayersListPanel.innerHTML = '';
    teams
      .sort((team1, team2) => compareBy<Team>(team1, team2, ['points']))
      .forEach(team => {
        const title = document.createElement('span');
        title.innerText = `${team.name} (${team.count}) Points: ${team.points}`;
        const ul = document.createElement('ul');
        players
          .filter(_player => _player.team === team.name)
          .sort((player1, player2) =>
            compareBy<PlayerListModel>(player1, player2, ['kills', 'deaths', 'hp'], [1, -1, 1]),
          )
          .forEach(_player => {
            const li = document.createElement('li');
            li.style.color = _player.color;
            li.appendChild(
              document.createTextNode(
                `${_player.name}: Kills:${_player.kills} Deaths:${_player.deaths} HP:${_player.hp}`,
              ),
            );
            ul.append(li);
          });
        teamsPlayersListPanel.append(title, ul);
      });
  }
}
