import { historical } from './books-historical.mjs';
import { historical2 } from './books-historical2.mjs';
import { wisdom } from './books-wisdom.mjs';
import { prophetsMajor } from './books-prophets-major.mjs';
import { prophetsMinor } from './books-prophets-minor.mjs';

export const books = [
  ...historical,
  ...historical2,
  ...wisdom,
  ...prophetsMajor,
  ...prophetsMinor,
];
