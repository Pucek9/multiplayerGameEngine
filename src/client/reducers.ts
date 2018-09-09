import {gamesListActions, joinGameActions} from "./actions";

export function gamesList(state = [], action) {
    if (Object.keys(gamesListActions).includes(action.type) && action.payload) {
        return action.payload(state);
    }
    return state;
}

export function joinGame(state = { nick: '', chosenGame: null}, action) {
    if (Object.keys(joinGameActions).includes(action.type) &&action.payload) {
        return action.payload(state);
    }
    return state;
}