import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { get, flatten } from 'lodash/fp';
import { UPDATE_TILE, POSITIONS_CALCULATE } from './actions';
import { GAME_RESET } from '../game/actions';
import {
  normalizedTiles,
  mapTilesWithDimension,
} from '../../lib/generateTiles';

export const REDUCER_NAME = 'tiles';

const initialStateData = normalizedTiles;

const updateTile = (tile, newTile) => ({
  ...tile,
  ...newTile,
  id: tile.id,
});

const data = handleActions(
  {
    [UPDATE_TILE]: (state, { payload: { id, ...newTile } }) => {
      if (id && newTile) {
        return update(state, {
          entities: {
            tiles: {
              [id]: {
                $apply: tile => updateTile(tile, newTile),
              },
            },
          },
        });
      }
      return state;
    },
    [POSITIONS_CALCULATE]: (state, { payload: { width, height } = {} }) => {
      if (width && height) {
        const tiles = get('entities.tiles', state);
        return update(state, {
          entities: {
            tiles: {
              $set: mapTilesWithDimension({ width, height })(tiles),
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
    [UPDATE_TILE]: (state, { payload: { id } }) =>
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
