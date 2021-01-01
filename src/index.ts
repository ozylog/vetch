let fetch: any;

if (typeof window !== 'undefined' && typeof window.fetch !== 'undefined') fetch = window.fetch;

export function setVetch(options: Options): void {
  if (options.fetch) fetch = options.fetch;
}

export default function vetch<T = any, E = any>(url: string, options?: VetchOptions): Vetch<T, E> {
  if (!url) throw new Error('URL is required');

  let parser: EParser | null = null;
  const exec = async (): Promise<VetchResponse<T, E>> => {
    const { query, ...opts } = options || {};

    if (!fetch) throw new Error('fetch is not defined');

    if (query) url += queryStringify(query);
    if (opts.payload) {
      if (typeof opts.payload === 'object') {
        opts.body = JSON.stringify(opts.payload);

        if (!opts.headers) opts.headers = new Headers();
        if (opts.headers instanceof Headers) {
          if (!opts.headers.has('Content-Type') && !opts.headers.has('content-type')) {
            opts.headers.set('Content-Type', 'application/json');
          }
        } else if (Array.isArray(opts.headers)) {
          const hasContentType = opts.headers.some(([ field ]) => field.toLowerCase() === 'content-type' );
          if (!hasContentType) opts.headers.push([ 'Content-Type', 'application/json' ]);
        } else {
          if (!opts.headers['Content-Type'] && !opts.headers['content-type']) {
            opts.headers['Content-Type'] = 'application/json';
          }
        }
      } else {
        opts.body = opts.payload;
      }
      delete opts.payload;
    }

    const res = await fetch(url, opts);
    let data;

    switch (parser) {
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

  const then = (resolve: any, reject: any) => {
    return exec().then(resolve, reject);
  };

  const arrayBuffer = () => {
    parser = EParser.arrayBuffer;

    return exec();
  };

  const blob = () => {
    parser = EParser.blob;

    return exec();
  };

  const formData = () => {
    parser = EParser.formData;

    return exec();
  };

  const json = () => {
    parser = EParser.json;

    return exec();
  };

  const text = () => {
    parser = EParser.text;

    return exec();
  };

  // @ts-ignore
  return { arrayBuffer, blob, formData, json, text, then };
}

function queryStringify(queryObject: Record<string, any>): string {
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

const enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

export interface Vetch<T, E> extends Promise<VetchResponse<undefined, undefined>> {
  arrayBuffer(): Promise<VetchResponse<T, E>>;
  blob(): Promise<VetchResponse<T, E>>;
  formData(): Promise<VetchResponse<T, E>>;
  json(): Promise<VetchResponse<T, E>>;
  text(): Promise<VetchResponse<T, E>>;
}

export interface VetchOptions extends RequestInit {
  query?: Record<string, any>;
  payload?: RequestInit['body'] | Record<string, any>;
}

export type VetchResponse<T, E> = Response &
({
  ok: true;
  data: T;
} |
{
  ok: false;
  data: E;
});

interface Options {
  fetch: any;
}
