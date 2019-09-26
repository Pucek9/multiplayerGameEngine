import { Unsubscribe } from 'redux';
import GameInstance from '../../shared/apiModels/GameInstance';
import { store, gamesListService, joinGameService, optionsService } from '../store/store';

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var createButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var blinkingCheckbox: HTMLInputElement;
declare var bulletShadowCheckbox: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;
declare var menu: HTMLDivElement;
declare var validateGameName: HTMLLabelElement;
declare var validateGameNameDuplicate: HTMLLabelElement;
declare var validateNick: HTMLLabelElement;
declare var validateSelectedGame: HTMLLabelElement;

export default class MenuComponent {
  unsubscribeRender: Unsubscribe;

  constructor(main) {
    this.unsubscribeRender = store.subscribe(() => this.render());

    createButton.addEventListener('click', function() {
      const roomName = gameNameInput.value;
      const type = gameTypeInput.value;
      const map = gameMapInput.value;
      main.onAddNewGame({ roomName, type, map });
      gameNameInput.value = '';
    });

    joinGameButton.addEventListener('click', function() {
      menu.style.display = 'none';
      main.onJoinGame();
    });

    gameNameInput.addEventListener('keyup', function() {
      gamesListService.setGameName(gameNameInput.value);
    });

    gameTypeInput.addEventListener('change', function() {
      gamesListService.setGameType(gameTypeInput.value);
    });

    gameMapInput.addEventListener('change', function() {
      gamesListService.setGameMap(gameMapInput.value);
    });

    nickInput.addEventListener('keyup', function() {
      joinGameService.setNick(nickInput.value);
    });

    blinkingCheckbox.addEventListener('change', function() {
      optionsService.setBlinking(blinkingCheckbox.checked);
    });
    bulletShadowCheckbox.addEventListener('change', function() {
      optionsService.setBulletShadow(bulletShadowCheckbox.checked);
    });
  }

  renderTable(state) {
    state.newGame.list.forEach((game: GameInstance) => {
      const roomName = document.createElement('td');
      roomName.appendChild(document.createTextNode(game.roomName));
      const type = document.createElement('td');
      type.appendChild(document.createTextNode(game.type));
      const map = document.createElement('td');
      map.appendChild(document.createTextNode(game.map));
      const count = document.createElement('td');
      count.appendChild(document.createTextNode(game.count.toString()));
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        joinGameService.chooseGame(game.roomName);
      });
      if (state.joinGame.chosenGame === game.roomName) {
        row.classList.add('active');
      }
      // @ts-ignore
      row.append(roomName, type, map, count);
      // @ts-ignore
      gamesListTable.append(row);
    });
  }

  render() {
    gamesListTable.innerHTML = '';
    const state = store.getState();
    this.renderTable(state);
    const nickEmpty = state.joinGame.nick === '';
    const chosenGameEmpty = state.joinGame.chosenGame === null;
    const idEmpty = state.joinGame.id === null;
    const roomNameEmpty = state.newGame.roomName === '';
    const roomNameDuplicate = state.newGame.list.find(
      game => game.roomName === state.newGame.roomName,
    );
    const typeEmpty = state.newGame.type === null;
    const mapEmpty = state.newGame.map === null;

    joinGameButton.disabled = nickEmpty || chosenGameEmpty || idEmpty;
    createButton.disabled = roomNameEmpty || typeEmpty || mapEmpty || roomNameDuplicate;

    validateNick.style.display = nickEmpty ? 'block' : 'none';
    validateSelectedGame.style.display = chosenGameEmpty ? 'block' : 'none';
    validateGameName.style.display = roomNameEmpty ? 'block' : 'none';
    validateGameNameDuplicate.style.display = roomNameDuplicate ? 'block' : 'none';
  }

  show() {
    menu.style.display = 'block';
  }

  hide() {
    menu.style.display = 'none';
    this.unsubscribeRender();
  }
}
