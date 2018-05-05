import fetch from './../../../src/lib/fetch';

describe('#fetch()', () => {
  describe('fetch(string)', () => {
    describe('json response', () => {
      let response;

      beforeAll(async () => {
        response = await fetch('http://5aec15a7f67ff70014510657.mockapi.io/json');
      });

      test(`should return response.status = 200`, () => {
        expect(response.status).toBe(200);
      });

      test(`should return response.payload = { hello: 'world' }`, () => {
        expect(response.payload).toEqual({ hello: 'world' });
      });
    });
  });
});
