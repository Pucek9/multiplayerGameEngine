import { chooseGame, setGameMap, setGameName, setGameType, setNick } from '../store/actions';
import { Store } from 'redux';

declare var gameNameInput: HTMLInputElement;
declare var gameTypeInput: HTMLSelectElement;
declare var gameMapInput: HTMLSelectElement;
declare var createButton: HTMLButtonElement;
declare var gamesListTable: HTMLTableDataCellElement;
declare var nickInput: HTMLInputElement;
declare var joinGameButton: HTMLButtonElement;
declare var menu: HTMLDivElement;
declare var validateGameName: HTMLLabelElement;
declare var validateGameNameDuplicate: HTMLLabelElement;
declare var validateNick: HTMLLabelElement;
declare var validateSelectedGame: HTMLLabelElement;

export default class MenuComponent {
  private store: Store;

  constructor(main, store: Store) {
    this.store = store;
    const unsubscribeRender = store.subscribe(() => this.render());

    createButton.addEventListener('click', function() {
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
    const nickEmpty = state.joinGame.nick === '';
    const chosenGameEmpty = state.joinGame.chosenGame === null;
    const idEmpty = state.joinGame.id === null;
    const nameEmpty = state.newGame.name === '';
    const nameDuplicate = state.newGame.list.find(game => game.name === state.newGame.name);
    const typeEmpty = state.newGame.type === null;
    const mapEmpty = state.newGame.map === null;

    joinGameButton.disabled = nickEmpty || chosenGameEmpty || idEmpty;
    createButton.disabled = nameEmpty || typeEmpty || mapEmpty || nameDuplicate;

    validateNick.style.display = nickEmpty ? 'block' : 'none';
    validateSelectedGame.style.display = chosenGameEmpty ? 'block' : 'none';
    validateGameName.style.display = nameEmpty ? 'block' : 'none';
    validateGameNameDuplicate.style.display = nameDuplicate ? 'block' : 'none';
  }

  show() {
    menu.style.display = 'flex';
  }
}
