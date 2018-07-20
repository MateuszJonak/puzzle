import { get } from 'lodash/fp';
import { REDUCER_NAME } from './reducers';
import { createSelector } from 'reselect';

export const TILES_BOX_RECT_NAME = 'tilesBoxRect';

export const getUIRects = get(`${REDUCER_NAME}.rect`);
export const getTilesBoxRect = createSelector(
  getUIRects,
  get(TILES_BOX_RECT_NAME),
);
