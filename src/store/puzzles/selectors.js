import { get } from 'lodash/fp';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { puzzlesGridSchema, puzzlesListSchema } from '../../lib/puzzlesSchema';

export const getNormalizedPuzzles = get('puzzles.data');
export const getPuzzlesOrder = get('puzzles.order');

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
