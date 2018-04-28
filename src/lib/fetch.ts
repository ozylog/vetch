import { IRequestInit, IResponse, request } from './../helpers';
import base from './../helpers/base';

function fetch(this: IFetch, options: IFetchOptions | string) {
  this._options = typeof options === 'string' ? { url: options } : options;
}

export default fetch.bind(base);

interface IFetch {
  _options: IRequestInit;
  _parser: EParser;
  arrayBuffer: () => this;
  blob: () => this;
  formData: () => this;
  json: () => this;
  text: () => this;
  exec: () => Promise<IResponse>;
  then: (resolve: any, reject: any) => Promise<IResponse>;
}

enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

interface IFetchOptions extends IRequestInit {}
