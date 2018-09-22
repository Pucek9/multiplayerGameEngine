import {gamesListActions, joinGameActions} from "./actions";

export function newGame(state = { name: '', type: 'Free4All', map: 'Prototype1', list: []}, action) {
    if (Object.keys(gamesListActions).includes(action.type) && action.payload) {
        return action.payload(state);
    }
    return state;
}

export function joinGame(state = { nick: '', id: null, chosenGame: null}, action) {
    if (Object.keys(joinGameActions).includes(action.type) && action.payload) {
        return action.payload(state);
    }
    return state;
}