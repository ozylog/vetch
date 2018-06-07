import 'isomorphic-fetch';

export function queryStringify(queryObject: IObject): string {
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

export async function request(param: IRequestInit) {
  let { url } = param;
  const { query, ...opts } = param;

  if (query) url += queryStringify(query);
  if (opts.payload) {
    if (typeof opts.payload === 'object') opts.body = JSON.stringify(opts.payload);
    delete opts.payload;
  }

  const res = await fetch(url, opts);

  if (!res.ok) {
    const error: IVetchError = new Error(res.statusText);

    error.res = res;

    throw error;
  }

  return res;
}

export interface IObject {
  [propName: string]: any;
}

export interface IRequestInit extends RequestInit {
  url: string;
  query?: IObject;
  payload?: RequestInit['body'] | IObject;
}

export interface IResponse extends Response {
  payload?: any;
}

export interface IVetchError extends Error {
  res?: Response;
}
