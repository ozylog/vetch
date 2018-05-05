import { IRequestInit, IResponse, request } from './../helpers';
import base, { EParser } from './../helpers/base';

function fetch(this: IFetch, options: IFetchOptions | string) {
  this._options = typeof options === 'string' ? { url: options } : options;
  this._parser = EParser.json;

  return this;
}

export default fetch.bind(base);

interface IFetch {
  _options: IRequestInit;
  _parser: EParser;
}

interface IFetchOptions extends IRequestInit {}
