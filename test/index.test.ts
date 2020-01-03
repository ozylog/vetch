import nock from 'nock';
import fetch from 'node-fetch';
import vetch, { setVetch } from './../src/index';

describe('#vetch()', () => {

  describe('when call vetch before setting fetch', () => {
    test(`should throw an error`, async () => {
      let error;

      try {
        await vetch('http://test.vetch.io/json');
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('fetch is not defined');
    });
  });

  describe('when setVetch({ fetch })', () => {
    beforeAll(() => {
      setVetch({ fetch });
    });

    describe('when response as json', () => {
      let response: any;

      beforeAll(async () => {
        nock('http://test.vetch.io').get('/json').reply(200, { hello: 'world' });

        response = await vetch('http://test.vetch.io/json').json();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data = { hello: 'world' }`, () => {
        expect(response!.data).toEqual({ hello: 'world' });
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when response as text', () => {
      let response: any;

      beforeAll(async () => {
        nock('http://test.vetch.io').get('/text').reply(200, 'hello world');

        response = await vetch('http://test.vetch.io/text').text();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data = 'hello world'`, () => {
        expect(response!.data).toEqual('hello world');
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when response as arrayBuffer', () => {
      let response: any;

      beforeAll(async () => {
        nock('http://test.vetch.io').get('/arrayBuffer').reply(200, new ArrayBuffer(8));

        // @ts-ignore
        response = await vetch('http://test.vetch.io/arrayBuffer').arrayBuffer();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data as arrayBuffer`, () => {
        expect(response!.data).toBeInstanceOf(ArrayBuffer);
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when response as blob', () => {
      let response: any;

      beforeAll(async () => {
        const blob = new Blob([JSON.stringify({ hello: 'world' }, null, 2)], {type : 'application/json'});
        nock('http://test.vetch.io').get('/blob').reply(200, blob);

        response = await vetch('http://test.vetch.io/blob').blob();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data as blob`, () => {
        expect(response!.data.constructor.name).toBe('Blob');
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when using query object', () => {
      let response: any;

      beforeAll(async () => {
        const object = { test: 123 };
        const query = Object.create(object);

        query.hello = 'world';
        query.arr = [ 1, 2, 3 ];

        nock('http://test.vetch.io')
          .get('/query?hello=world&arr[]=1&arr[]=2&arr[]=3')
          .reply(200, { hello: 'world' });

        response = await vetch('http://test.vetch.io/query', { query }).json();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data = { hello: 'world' }`, () => {
        expect(response!.data).toEqual({ hello: 'world' });
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when using payload', () => {
      let response: any;
      const payload = { username: 'hello', password: 'world' };

      beforeAll(async () => {
        nock('http://test.vetch.io')
          .post('/payload', (body) => body.username && body.password)
          .reply(200, { hello: 'world' });

        response = await vetch('http://test.vetch.io/payload', {
          method: 'POST',
          payload
        }).json();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return response.data = { hello: 'world' }`, () => {
        expect(response!.data).toEqual({ hello: 'world' });
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when response without chaining method/parser', () => {
      let response: any;

      beforeAll(async () => {
        nock('http://test.vetch.io').get('/json').reply(200, { hello: 'world' });

        response = await vetch('http://test.vetch.io/json');

      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 200`, () => {
        expect(response!.status).toBe(200);
      });

      test(`should return native response`, async () => {
        expect(response!.data).toEqual(undefined);
        const parsedbody = await response.json();
        expect(parsedbody).toEqual({ hello: 'world' });
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });

    describe('when there is no url for vetch(urlString)', () => {
      test(`should throw Error`, async () => {
        let error;

        try {
          // @ts-ignore - Test purpose only
          await vetch();
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(Error);
      });
    });

    describe('when there is no url for vetch()', () => {
      test(`should throw Error`, async () => {
        let error;

        try {
          // @ts-ignore - Test purpose only
          await vetch();
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('URL is required');
      });
    });

    describe('when response status code = 400', () => {
      let response: any;

      beforeAll(async () => {
        nock('http://test.vetch.io').get('/json').reply(400, { message: 'Invalid data' });

        response = await vetch('http://test.vetch.io/json').json();
      });

      afterAll(() => {
        nock.cleanAll();
      });

      test(`should return response.status = 400`, () => {
        expect(response!.status).toBe(400);
      });

      test(`should return response.data = { message: 'Invalid data' }`, () => {
        expect(response!.data).toEqual({ message: 'Invalid data' });
      });

      test(`should return headers`, () => {
        expect(response!.headers).toBeDefined;
      });
    });
  });
});
