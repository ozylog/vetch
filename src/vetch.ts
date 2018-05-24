import { IRequestInit, IResponse, request } from './helpers';

function vetch(this: IFetch, options: IFetchOptions | string) {
  if (!options || (typeof options === 'object' && !options.url)) throw new Error('URL is required');

  this._options = typeof options === 'string' ? { url: options } : options;
  this._parser = EParser.json;

  return this;
}

export default vetch.bind({
  arrayBuffer() {
    this._parser = EParser.arrayBuffer;

    return this;
  },
  blob() {
    this._parser = EParser.blob;

    return this;
  },
  formData() {
    this._parser = EParser.formData;

    return this;
  },
  json() {
    this._parser = EParser.json;

    return this;
  },
  text() {
    this._parser = EParser.text;

    return this;
  },
  async exec() {
    if (!this._options || !this._options.url) throw new Error('URL is required');

    const res = await request(this._options);
    let payload;

    switch (this._parser) {
      case EParser.arrayBuffer:
        payload = await res.arrayBuffer();
        break;
      case EParser.blob:
        payload = await res.blob();
        break;
      case EParser.formData:
        payload = await res.formData();
        break;
      case EParser.json:
        payload = await res.json();
        break;
      case EParser.text:
        payload = await res.text();
        break;
    }

    return {
      ...res,
      payload
    };
  },
  then(resolve: Promise<IResponse>, reject: any) {
    return this.exec().then(resolve, reject);
  }
});

enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

interface IFetch {
  _options: IRequestInit;
  _parser: EParser;
}

interface IFetchOptions extends IRequestInit {}
