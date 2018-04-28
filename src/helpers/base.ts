import { IRequestInit, IResponse, request } from './../helpers';

export default function base(this: IBaseFetch) {
  this._parser = EParser.json;

  this.arrayBuffer = function() {
    this._parser = EParser.arrayBuffer;

    return this;
  };

  this.blob = function() {
    this._parser = EParser.blob;

    return this;
  };

  this.formData = function() {
    this._parser = EParser.formData;

    return this;
  };

  this.json = function() {
    this._parser = EParser.json;

    return this;
  };

  this.text = function() {
    this._parser = EParser.text;

    return this;
  };

  this.exec = async function() {
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
  };

  this.then = function(resolve, reject) {
    return this.exec().then(resolve, reject);
  };
}

interface IBaseFetch {
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
