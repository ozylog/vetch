import { IRequestInit } from './../helpers';
import Base from './Base';

export default class Fetch extends Base {
  // TODO: find a way to make this private _options
  protected _options: IRequestInit | null;

  constructor() {
    super();
    this._options = null;
  }

  public call(options: IFetchOptions | string) {
    this._options = typeof options === 'string' ? { url: options } : options;

    return this;
  }
}

interface IFetchOptions extends IRequestInit {}
