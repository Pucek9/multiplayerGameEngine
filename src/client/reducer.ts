export default function reducer(state = {gamesList: []}, action) {
    console.log(action);
    if (action.payload) {
        return action.payload(state);
    }
    return state;
}