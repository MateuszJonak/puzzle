import { schema } from 'normalizr';

const tilesSchema = new schema.Entity('tiles');
export const tilesListSchema = new schema.Array(tilesSchema);

export const tilesGridSchema = new schema.Array(tilesListSchema);
