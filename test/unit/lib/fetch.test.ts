import fetch from './../../../src/lib/fetch';

describe('#fetch()', () => {
  describe('fetch(string)', () => {
    let response;

    beforeAll(async () => {
      response = await new fetch('http://ozylog.getsandbox.com/hello').text();
    });

    test(`should return response.payload = 'Hello world'`, () => {
      expect(response.payload).toBe('Hello world');
    });
  });
});
