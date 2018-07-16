import { handleActions } from 'redux-actions';
import { UPDATE_PUZZLES } from './actions';

export const REDUCER_NAME = 'puzzles';

const PUZZLES = [
  {
    id: 1,
    top: 10,
    left: 10,
    color: '#653423',
  },
  {
    id: 2,
    top: 10,
    left: 75,
    color: '#143f23',
  },
];
const initialState = PUZZLES;

export default handleActions(
  {
    [UPDATE_PUZZLES]: (state, { payload: { puzzles } }) => {
      if (puzzles) {
        return puzzles;
      }
      return state;
    },
  },
  initialState,
);
