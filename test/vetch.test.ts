import nock from 'nock';
import vetch from './../src/vetch';

describe('#vetch()', () => {
  describe('when response as json', () => {
    let response;

    beforeAll(async () => {
      nock('http://test.vetch.io').get('/json').reply(200, { hello: 'world' });

      response = await vetch('http://test.vetch.io/json').json();
    });

    afterAll(() => {
      nock.cleanAll();
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = { hello: 'world' }`, () => {
      expect(response.payload).toEqual({ hello: 'world' });
    });
  });

  describe('when response as text', () => {
    let response;

    beforeAll(async () => {
      nock('http://test.vetch.io').get('/text').reply(200, 'hello world');

      response = await vetch('http://test.vetch.io/text').text();
    });

    afterAll(() => {
      nock.cleanAll();
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = 'hello world'`, () => {
      expect(response.payload).toEqual('hello world');
    });
  });

  describe('when using query object', () => {
    let response;

    beforeAll(async () => {
      const object = { test: 123 };
      const query = Object.create(object);

      query.hello = 'world';
      query.arr = [ 1, 2, 3 ];

      nock('http://test.vetch.io')
        .get('/query')
        .query({ hello: 'world' })
        .reply(200, { hello: 'world' });

      response = await vetch({
        url: 'http://test.vetch.io/query',
        query
      });
    });

    afterAll(() => {
      nock.cleanAll();
    });

    test(`should return response.status = 200`, () => {
      expect(response.status).toBe(200);
    });

    test(`should return response.payload = { hello: 'world' }`, () => {
      expect(response.payload).toEqual({ hello: 'world' });
    });
  });

  describe('when using payload', () => {
    let response;
    const payload = { username: 'hello', password: 'world' };

    beforeAll(async () => {
      const query = { hello: 'world', arr: [ 'value1', 'value2' ] };
      nock('http://test.vetch.io')
        .post('/payload', (body) => body.username && body.password)
        .reply(200, { hello: 'world' });

      response = await vetch({
        method: 'POST',
        url: 'http://test.vetch.io/payload',
        payload
      });
    });

    afterAll(() => {
      nock.cleanAll();
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

  describe('when response status code = 400', () => {
    test(`should throws error`, async () => {
      nock('http://test.vetch.io').get('/json').reply(400, { message: 'Invalid data' });

      let error;

      try {
        await vetch('http://test.vetch.io/json').json();
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Bad Request');

      const payloadError = await error.res.json();
      expect(payloadError).toEqual({ message: 'Invalid data' });

      nock.cleanAll();
    });
  });
});
