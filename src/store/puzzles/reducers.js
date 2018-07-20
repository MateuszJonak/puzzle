import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { get, flatten } from 'lodash/fp';
import { UPDATE_PUZZLE, POSITIONS_CALCULATE } from './actions';
import { GAME_RESET } from '../game/actions';
import {
  normalizedPuzzles,
  mapPuzzlesWithDimension,
} from '../../lib/generatePuzzles';

export const REDUCER_NAME = 'puzzles';

const initialStateData = normalizedPuzzles;

const updatePuzzle = (puzzle, newPuzzle) => ({
  ...puzzle,
  ...newPuzzle,
  id: puzzle.id,
});

const data = handleActions(
  {
    [UPDATE_PUZZLE]: (state, { payload: { id, ...newPuzzle } }) => {
      if (id && newPuzzle) {
        return update(state, {
          entities: {
            puzzles: {
              [id]: {
                $apply: puzzle => updatePuzzle(puzzle, newPuzzle),
              },
            },
          },
        });
      }
      return state;
    },
    [POSITIONS_CALCULATE]: (state, { payload: { width, height } = {} }) => {
      if (width && height) {
        const puzzles = get('entities.puzzles', state);
        return update(state, {
          entities: {
            puzzles: {
              $set: mapPuzzlesWithDimension({ width, height })(puzzles),
            },
          },
        });
      }
      return state;
    },
    [GAME_RESET]: () => ({ ...initialStateData }),
  },
  initialStateData,
);

const order = handleActions(
  {
    [UPDATE_PUZZLE]: (state, { payload: { id } }) =>
      update(state, {
        $splice: [[state.indexOf(id), 1]],
        $push: [id],
      }),
    [GAME_RESET]: () => [...flatten(initialStateData.result)],
  },
  flatten(initialStateData.result),
);

export default combineReducers({
  data,
  order,
});
