import { combineReducers } from 'redux';
import { gameReducer, REDUCER_NAME as GAME_REDUCER_NAME } from './game';
import {
  puzzlesReducer,
  REDUCER_NAME as PUZZLES_REDUCER_NAME,
} from './puzzles';
import { uiReducer, REDUCER_NAME as UI_REDUCER_NAME } from './ui';

export default combineReducers({
  [PUZZLES_REDUCER_NAME]: puzzlesReducer,
  [GAME_REDUCER_NAME]: gameReducer,
  [UI_REDUCER_NAME]: uiReducer,
});
