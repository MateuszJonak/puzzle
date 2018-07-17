import { handleActions } from 'redux-actions';
import { UPDATE_PUZZLE } from './actions';
import { generatePuzzles, updatePuzzle } from '../../lib/generatePuzzles';

export const REDUCER_NAME = 'puzzles';

const initialState = generatePuzzles();

export default handleActions(
  {
    [UPDATE_PUZZLE]: (state, { payload: { id, ...puzzle } }) => {
      const updatePuzzleMethod = updatePuzzle(state);
      if (id && puzzle) {
        return updatePuzzleMethod(id, puzzle);
      }
      return state;
    },
  },
  initialState,
);
