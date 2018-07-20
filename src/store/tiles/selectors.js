import { get } from 'lodash/fp';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { tilesGridSchema, tilesListSchema } from '../../lib/tilesSchema';
import { REDUCER_NAME } from './reducers';

export const getNormalizedTiles = get(`${REDUCER_NAME}.data`);
export const getTilesOrder = get(`${REDUCER_NAME}.order`);

export const getDenormalizedTiles = createSelector(
  getNormalizedTiles,
  normalizedTiles =>
    denormalize(
      normalizedTiles.result,
      tilesGridSchema,
      normalizedTiles.entities,
    ),
);

export const getTiles = createSelector(
  getNormalizedTiles,
  getTilesOrder,
  (normalizedTiles, tilesOrder) =>
    denormalize(tilesOrder, tilesListSchema, normalizedTiles.entities),
);
