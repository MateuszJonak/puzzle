import { IMAGE_WIDTH, IMAGE_HEIGHT } from './imageConstants';

export const IDS_ROWS = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

export const generatePuzzles = () =>
  IDS_ROWS.map((row, indexRow) => {
    const width = IMAGE_WIDTH / row.length + 1;
    const height = IMAGE_HEIGHT / IDS_ROWS.length + 1;

    return row.map((id, indexColumn) => ({
      id,
      top: 10,
      left: 75 * id,
      width,
      height,
      isMatched: false,
      backgroundPosition: [
        `${-indexColumn * width}px`,
        `${-indexRow * height}px`,
      ],
    }));
  });

export const updatePuzzle = puzzles => (id, newPuzzle) =>
  puzzles.map(row =>
    row.map(puzzle => {
      if (puzzle.id === id) {
        return {
          ...puzzle,
          ...newPuzzle,
          id: puzzle.id,
        };
      }
      return puzzle;
    }),
  );
