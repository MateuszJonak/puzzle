import { round, random, mapValues } from 'lodash/fp';
import { normalize } from 'normalizr';
import { puzzlesGridSchema } from './puzzlesSchema';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './imageConstants';

export const IDS_ROWS = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

export const PUZZLES = IDS_ROWS.map((row, indexRow) => {
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

export const normalizedPuzzles = normalize(PUZZLES, puzzlesGridSchema);

const BOX_OFFSET = 10;

const getRandomDimension = (boxDimension, puzzleDimension, offset) =>
  random(
    -puzzleDimension / 2 + offset,
    boxDimension - puzzleDimension / 2 - offset,
  );

export const mapPuzzlesWithDimension = ({ width, height }) =>
  mapValues(puzzle => ({
    ...puzzle,
    top: getRandomDimension(height, puzzle.height, BOX_OFFSET),
    left: getRandomDimension(width, puzzle.width, BOX_OFFSET),
  }));
