import { schema } from 'normalizr';

const puzzlesSchema = new schema.Entity('puzzles');
export const puzzlesListSchema = new schema.Array(puzzlesSchema);

export const puzzlesGridSchema = new schema.Array(puzzlesListSchema);
