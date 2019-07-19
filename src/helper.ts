import { getFetch } from './index';

export function queryStringify(queryObject: Dictionary<any>): string {
  let query = '';

  for (let key in queryObject) {
    if (!{}.hasOwnProperty.call(queryObject, key)) continue;

    const value = queryObject[key];
    key = encodeURI(key);

    if (value instanceof Array) {
      for (const item of value) {
        query += `&${key}[]=${encodeURI(item)}`;
      }
    } else {
      query += `&${key}=${encodeURI(value)}`;
    }
  }

  if (query) query = `?${query.substr(1)}`;

  return query;
}

export async function request(url: string, options: VetchOptions = {}) {
  const fetch = getFetch();
  const { query, ...opts } = options;

  if (query) url += queryStringify(query);
  if (opts.payload) {
    if (typeof opts.payload === 'object') opts.body = JSON.stringify(opts.payload);
    delete opts.payload;
  }

  return await fetch(url, opts);
}

export interface Dictionary<T> {
  [propName: string]: T;
}

export interface VetchOptions extends RequestInit {
  query?: Dictionary<any>;
  payload?: RequestInit['body'] | Dictionary<any>;
}

export interface VetchResponse extends Response {
  data?: any;
}
