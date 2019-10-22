import { compareBy } from '../../shared/helpers';

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

  update(players: any[]) {
    playersList.innerHTML = '';
    players
      .sort((player1, player2) => (player1.kills < player2.kills ? 1 : -1))
      .sort((player1, player2) =>
        compareBy(player1, player2, ['kills', 'deaths', 'hp'], [1, -1, 1]),
      )
      .forEach(_player => {
        const li = document.createElement('li');
        li.style.color = _player.color;
        li.appendChild(
          document.createTextNode(
            `${_player.name}: Kills:${_player.kills} Deaths:${_player.deaths} HP:${_player.hp}`,
          ),
        );
        // @ts-ignore
        playersList.append(li);
      });
  }
}
