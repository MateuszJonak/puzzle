import { get } from 'lodash/fp';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { puzzlesGridSchema, puzzlesListSchema } from '../../lib/puzzlesSchema';
import { REDUCER_NAME } from './reducers';

export const getNormalizedPuzzles = get(`${REDUCER_NAME}.data`);
export const getPuzzlesOrder = get(`${REDUCER_NAME}.order`);

export const getDenormalizedPuzzles = createSelector(
  getNormalizedPuzzles,
  normalizedPuzzles =>
    denormalize(
      normalizedPuzzles.result,
      puzzlesGridSchema,
      normalizedPuzzles.entities,
    ),
);

export const getPuzzles = createSelector(
  getNormalizedPuzzles,
  getPuzzlesOrder,
  (normalizedPuzzles, puzzlesOrder) =>
    denormalize(puzzlesOrder, puzzlesListSchema, normalizedPuzzles.entities),
);
