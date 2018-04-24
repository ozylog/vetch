import { IObject, IRequestInit, IResponse, request } from './../helpers';
import Base from './Base';

export default class Fetch extends Base {
  private _options: IFetchOptions | null;

  constructor() {
    super();
    this._options = null;
  }

  public fetch(options: IFetchOptions | string) {
    this._options = typeof options === 'string' ? { url: options } : options ;

    return this;
  }
}

interface IFetchOptions extends IRequestInit {}
