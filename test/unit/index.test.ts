import { fetch, fetchGraphql } from './../../src/index';

describe('export functions', () => {
  test('should export fetch function', () => {
    expect(fetch).toBeDefined();
  });

  test('should export fetchGraphql function', () => {
    expect(fetchGraphql).toBeDefined();
  });
});
