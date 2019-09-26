import { combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { gamesReducer } from './games/reducers';
import { userReducer } from './user/reducers';
import { optionsReducer } from './options/reducers';
import { GamesService } from './games/fascade';
import { UserService } from './user/fascade';
import { OptionsService } from './options/fascade';

const rootReducer = combineReducers({
  games: gamesReducer,
  user: userReducer,
  options: optionsReducer,
});

export const store: Store = createStore(rootReducer, composeWithDevTools());

// export type AppState = ReturnType<typeof rootReducer>;

export const gamesService = new GamesService(store);
export const userService = new UserService(store);
export const optionsService = new OptionsService(store);
