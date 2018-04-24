import { IObject, IRequestInit, IResponse, request } from './../helpers';

export default class Base {
  private _options: any;
  protected _parser: EParser;

  constructor() {
    this._options = null;
    this._parser = EParser.json;
  }

  public fetch(options: any) {
    this._options = options ;

    return this;
  }

  public arrayBuffer() {
    this._parser = EParser.arrayBuffer;

    return this;
  }

  public blob() {
    this._parser = EParser.blob;

    return this;
  }

  public formData() {
    this._parser = EParser.formData;

    return this;
  }

  public json() {
    this._parser = EParser.json;

    return this;
  }

  public text() {
    this._parser = EParser.text;

    return this;
  }

  private async valueOf(): Promise<IResponse> {
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
  }
}

enum EParser {
  arrayBuffer,
  blob,
  formData,
  json,
  text
}
