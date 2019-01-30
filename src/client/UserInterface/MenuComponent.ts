import {
  chooseGame,
  setGameMap,
  setGameName,
  setGameType,
  setNick
} from '../store/actions';

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var addNewGameButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;
declare var menu: HTMLDivElement;
declare var validateGameName: HTMLLabelElement;
declare var validateNick: HTMLLabelElement;
declare var validateSelectedGame: HTMLLabelElement;

export default class MenuComponent {
  private store;

  constructor(main, store) {
    this.store = store;
    const unsubscribeRender = store.subscribe(() => this.render());

    addNewGameButton.addEventListener('click', function() {
      const name = gameNameInput.value;
      const type = gameTypeInput.value;
      const map = gameMapInput.value;
      main.onAddNewGame({ name, type, map });
      gameNameInput.value = '';
    });

    joinGameButton.addEventListener('click', function() {
      menu.style.display = 'none';
      main.onJoinGame();
    });

    gameNameInput.addEventListener('keyup', function() {
      store.dispatch(setGameName(gameNameInput.value));
    });

    gameTypeInput.addEventListener('change', function() {
      store.dispatch(setGameType(gameTypeInput.value));
    });

    gameMapInput.addEventListener('change', function() {
      store.dispatch(setGameMap(gameMapInput.value));
    });

    nickInput.addEventListener('keyup', function() {
      store.dispatch(setNick(nickInput.value));
    });
  }

  renderTable(state) {
    state.newGame.list.forEach(game => {
      const name = document.createElement('td');
      name.appendChild(document.createTextNode(game.name));
      const type = document.createElement('td');
      type.appendChild(document.createTextNode(game.type));
      const map = document.createElement('td');
      map.appendChild(document.createTextNode(game.map));
      const count = document.createElement('td');
      count.appendChild(document.createTextNode(game.count));
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        this.store.dispatch(chooseGame(game.name));
      });
      if (state.joinGame.chosenGame === game.name) {
        row.style.backgroundColor = 'grey';
      }
      // @ts-ignore
      row.append(name, type, map, count);
      // @ts-ignore
      gamesListTable.append(row);
    });
  }

  render() {
    gamesListTable.innerHTML = '';
    const state = this.store.getState();
    this.renderTable(state);
    joinGameButton.disabled =
      state.joinGame.nick === '' ||
      state.joinGame.chosenGame === null ||
      state.joinGame.id === null;
    addNewGameButton.disabled =
      state.newGame.name === '' ||
      state.newGame.type === null ||
      state.newGame.map === null;
    validateNick.style.visibility =
      state.joinGame.nick === '' ? 'visible' : 'hidden';
    validateSelectedGame.style.visibility =
      state.joinGame.chosenGame === null ? 'visible' : 'hidden';
    validateGameName.style.visibility =
      state.newGame.name === '' ? 'visible' : 'hidden';
  }
}
