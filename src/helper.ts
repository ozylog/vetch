import 'isomorphic-fetch';

export function queryStringify(queryObject: Dictionary<any>): string {
  let query: string = '';

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

export async function request(param: VetchOptions) {
  let { url } = param;
  const { query, ...opts } = param;

  if (query) url += queryStringify(query);
  if (opts.payload) {
    if (typeof opts.payload === 'object') opts.body = JSON.stringify(opts.payload);
    delete opts.payload;
  }

  const res = await fetch(url, opts);

  if (!res.ok) {
    const error: VetchError = new Error(res.statusText);

    error.res = res;

    throw error;
  }

  return res;
}

export interface Dictionary<T> {
  [propName: string]: T;
}

export interface VetchOptions extends RequestInit {
  url: string;
  query?: Dictionary<any>;
  payload?: RequestInit['body'] | Dictionary<any>;
}

export interface VetchResponse extends Response {
  data?: any;
}

export interface VetchError extends Error {
  res?: Response;
}
