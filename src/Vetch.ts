export const enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

function queryStringify(queryObject: Dictionary<any>): string {
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

export default class Vetch {
  private _options!: VetchOptions;
  private _url!: string;
  private _parser!: EParser;

  public static fetch: any = window && window.fetch;

  public constructor(url: string, options: VetchOptions = {}) {
    this._url = url;
    this._options = options;
  }

  public async exec() {
    const { query, ...opts } = this._options;

    if (!Vetch.fetch) throw new Error('fetch is not defined');

    if (query) this._url += queryStringify(query);
    if (opts.payload) {
      if (typeof opts.payload === 'object') opts.body = JSON.stringify(opts.payload);
      delete opts.payload;
    }

    const res = await Vetch.fetch(this._url, opts);
    let data;

    switch (this._parser) {
      case EParser.arrayBuffer:
        data = await res.arrayBuffer();
        break;
      case EParser.blob:
        data = await res.blob();
        break;
      case EParser.formData:
        data = await res.formData();
        break;
      case EParser.json:
        data = await res.json();
        break;
      case EParser.text:
        data = await res.text();
        break;
    }

    if (data !== undefined) res.data = data;

    return res;
  };

  public set parser(type: EParser) {
    this._parser = type;
  }
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
