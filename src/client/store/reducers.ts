import { gamesListActions, joinGameActions, optionsActions } from './actions';

export function newGameReducer(
  state = { roomName: '', type: 'Free4All', map: 'Playground', list: [] },
  action,
) {
  if (Object.keys(gamesListActions).includes(action.type) && action.payload) {
    return action.payload(state);
  }
  return state;
}

export function joinGameReducer(state = { nick: '', id: null, chosenGame: null }, action) {
  if (Object.keys(joinGameActions).includes(action.type) && action.payload) {
    return action.payload(state);
  }
  return state;
}

export function optionsReducer(state = { blinking: false, bulletShadow: true }, action) {
  if (Object.keys(optionsActions).includes(action.type) && action.payload) {
    return action.payload(state);
  }
  return state;
}
