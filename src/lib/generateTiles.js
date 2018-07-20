import { round, random, mapValues } from 'lodash/fp';
import { normalize } from 'normalizr';
import { tilesGridSchema } from './tilesSchema';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './imageConstants';

export const IDS_ROWS = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

export const TILES = IDS_ROWS.map((row, indexRow) => {
  const width = round(IMAGE_WIDTH / row.length + 1);
  const height = round(IMAGE_HEIGHT / IDS_ROWS.length + 1);

  return row.map((id, indexColumn) => ({
    id,
    width,
    height,
    indexRow,
    isMatched: false,
    backgroundPosition: [
      `${-indexColumn * width}px`,
      `${-indexRow * height}px`,
    ],
  }));
});

export const normalizedTiles = normalize(TILES, tilesGridSchema);

const BOX_OFFSET = 10;

const getRandomDimension = (boxDimension, tileDimension, offset) =>
  random(
    -tileDimension / 2 + offset,
    boxDimension - tileDimension / 2 - offset,
  );

export const mapTilesWithDimension = ({ width, height }) =>
  mapValues(tile => ({
    ...tile,
    top: getRandomDimension(height, tile.height, BOX_OFFSET),
    left: getRandomDimension(width, tile.width, BOX_OFFSET),
  }));
