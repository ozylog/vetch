import { IObject, IRequestInit, IResponse, request } from './helpers';

function vetchG(this: IVetchG, options: IVetchGOptions) {
  if (!options || !options.url) throw new Error('URL is required');

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

export default vetchG.bind({
  async exec() {
    if (!this._options || !this._options.url) throw new Error('URL is required');

    const res = await request(this._options);
    const payload = await res.json();

    return {
      ...res,
      payload
    };
  },
  then(resolve: any, reject: any) {
    return this.exec().then(resolve, reject);
  }
});

interface IVetchG {
  _options: IRequestInit;
}

interface IVetchGOptions extends RequestInit {
  url: string;
  query: string;
  variables?: IObject;
}
