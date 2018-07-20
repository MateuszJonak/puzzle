import { get } from 'lodash/fp';
import { REDUCER_NAME } from './reducers';
import { createSelector } from 'reselect';

export const PUZZLE_BOX_RECT_NAME = 'puzzleBoxRect';

export const getUIRects = get(`${REDUCER_NAME}.rect`);
export const getPuzzleBoxRect = createSelector(
  getUIRects,
  get(PUZZLE_BOX_RECT_NAME),
);
