import { request, VetchOptions, VetchResponse } from './helper';

export const enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

export default class Vetch {
  private _options!: VetchOptions | undefined;
  private _url!: string;
  private _parser!: EParser;

  constructor(url: string, options?: VetchOptions) {
    this._url = url;
    this._options = options;
  }

  public async exec() {
    let res: VetchResponse = await request(this._url, this._options);
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

    if (data !== undefined) res = { ...res, data };

    return res;
  };

  public set parser(type: EParser) {
    this._parser = type;
  }

}
