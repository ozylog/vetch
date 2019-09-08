// import Vetch, { EParser, VetchOptions } from './Vetch';
// export { VetchOptions, VetchResponse } from './Vetch';

let fetch: any = window && window.fetch;

export function setVetch(options: Options) {
  if (options.fetch) fetch = options.fetch;
}


export default function vetch(url: string, options?: VetchOptions) {
  if (!url) throw new Error('URL is required');

  this._url = url;
  this._options = options;

  return this;

  /*
  this.then = (resolve: any, reject: any) => v.exec().then(resolve).catch(reject);

  this.arrayBuffer = () => {
    v.parser = EParser.arrayBuffer;

    return this;
  };

  this.blob = () => {
    v.parser = EParser.blob;

    return this;
  };

  this.formData = () => {
    v.parser = EParser.formData;

    return this;
  };

  this.json = () => {
    v.parser = EParser.json;

    return this;
  };

  this.text = () => {
    v.parser = EParser.text;

    return this;
  };

  return this;
  */
}

vetch.prototype.exec = function exec() {
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

interface Options {
  fetch: any;
}


