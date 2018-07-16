import { combineReducers } from 'redux';
import {
  puzzlesReducer,
  REDUCER_NAME as PUZZLES_REDUCER_NAME,
} from './puzzles';

export default combineReducers({
  [PUZZLES_REDUCER_NAME]: puzzlesReducer,
});
