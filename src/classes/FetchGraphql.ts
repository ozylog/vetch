import { IObject, IRequestInit } from './../helpers';
import Base from './Base';

export default class FetchGraphql extends Base {
  // TODO: find a way to make this private _options
  protected _options: IRequestInit | null;

  constructor() {
    super();
    this._options = null;
  }

  public call(options: IFetchGraphqlOptions) {
    const { query, variables, ...others } = options;
    this._options = {
      ...others,
      method: 'POST',
      payload: {
        query,
        variables
      }
    };

    return this;
  }
}

interface IFetchGraphqlOptions extends RequestInit {
  url: string;
  query: string;
  variables?: IObject;
}
