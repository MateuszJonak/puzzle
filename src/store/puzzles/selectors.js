import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

export const getPuzzles = get('puzzles');

export const getPuzzlesFlatten = createSelector(getPuzzles, puzzlesState =>
  puzzlesState.reduce((result, row) => result.concat(row), []),
);
