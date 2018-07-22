import { combineReducers } from 'redux';
import { gameReducer, REDUCER_NAME as GAME_REDUCER_NAME } from './game';
import { tilesReducer, REDUCER_NAME as TILES_REDUCER_NAME } from './tiles';
import { uiReducer, REDUCER_NAME as UI_REDUCER_NAME } from './ui';

export default combineReducers({
  [TILES_REDUCER_NAME]: tilesReducer,
  [GAME_REDUCER_NAME]: gameReducer,
  [UI_REDUCER_NAME]: uiReducer,
});
