import { vetch, vetchG } from './../../src/index';

describe('export functions', () => {
  test('should export fetch function', () => {
    expect(vetch).toBeDefined();
  });

  test('should export fetchGraphql function', () => {
    expect(vetchG).toBeDefined();
  });
});
