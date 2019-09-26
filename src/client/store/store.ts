import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { newGameReducer } from './newGame/reducers';
import { joinGameReducer } from './joinGame/reducers';
import { optionsReducer } from './options/reducers';
import { GamesListService } from './newGame/fascade';
import { JoinGameService } from './joinGame/fascade';
import { OptionsService } from './options/fascade';

const rootReducer = combineReducers({
  newGame: newGameReducer,
  joinGame: joinGameReducer,
  options: optionsReducer,
});

export const store: Store = createStore(rootReducer, composeWithDevTools());

// export type AppState = ReturnType<typeof rootReducer>;

export const gamesListService = new GamesListService(store);
export const joinGameService = new JoinGameService(store);
export const optionsService = new OptionsService(store);
