import { compareBy } from '../../shared/helpers';
import PlayerListModel from '../interfaces/PlayerListModel';
declare var playerListPanel: HTMLDivElement;
declare var playersList: HTMLUListElement;

export default class PlayerListComponent {
  constructor() {}

  show() {
    playerListPanel.style.display = 'block';
  }

  hide() {
    playerListPanel.style.display = 'none';
  }

  update(players: Array<PlayerListModel>) {
    playersList.innerHTML = '';
    players
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
        playersList.append(li);
      });
  }
}
