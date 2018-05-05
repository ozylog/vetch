import { IObject, IRequestInit, IResponse, request } from './../helpers';
import base, { EParser } from './../helpers/base';

function fetchGraphql(this: IFetchGraphql, options: IFetchGraphqlOptions) {
  const { query, variables, ...others } = options;

  this._options = {
    ...others,
    method: 'POST',
    payload: {
      query,
      variables
    }
  };
  this._parser = EParser.json;

  return this;
}

export default fetchGraphql.bind(base);

interface IFetchGraphql {
  _options: IRequestInit;
  _parser: EParser;
}

interface IFetchGraphqlOptions extends RequestInit {
  url: string;
  query: string;
  variables?: IObject;
}
