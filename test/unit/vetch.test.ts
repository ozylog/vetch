import nock from 'nock';
import vetch from './../../src/vetch';

describe('#vetch()', () => {
  describe('when response is json', () => {
    let response;

    beforeAll(async () => {
      nock('http://test.vetch.io').get('/json').reply(200, { hello: 'world' });

      response = await vetch('http://test.vetch.io/json').json();
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = { hello: 'world' }`, () => {
      expect(response.payload).toEqual({ hello: 'world' });
    });
  });

  describe('when response is text', () => {
    let response;

    beforeAll(async () => {
      nock('http://test.vetch.io').get('/text').reply(200, 'hello world');

      response = await vetch('http://test.vetch.io/text').text();
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = 'hello world'`, () => {
      expect(response.payload).toEqual('hello world');
    });
  });

  describe('when user query', () => {
    let response;

    beforeAll(async () => {
      const query = { hello: 'world', arr: [ 'value1', 'value2' ] };
      nock('http://test.vetch.io')
        .get('/query')
        .query(query)
        .reply(200, { hello: 'world' });

      response = await vetch({
        url: 'http://test.vetch.io/query',
        query
      });
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = { hello: 'world' }`, () => {
      expect(response.payload).toEqual({ hello: 'world' });
    });
  });

  describe('when there is no url for vetch(urlString)', () => {
    test(`should throw Error`, async () => {
      let error;

      try {
        await vetch();
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('when there is no url for vetch({ url: urlString })', () => {
    test(`should throw Error`, async () => {
      let error;

      try {
        await vetch({});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(Error);
    });
  });
});
