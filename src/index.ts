import { request, VetchOptions, VetchResponse } from './helper';

export default function vetch(options: VetchOptions | string): Vetch {
  if (!options || (typeof options === 'object' && !options.url)) throw new Error('URL is required');

  const self = this as Vetch;

  self._options = typeof options === 'string' ? { url: options } : options;
  self._parser = null;

  const exec = async () => {
    let res: VetchResponse = await request(self._options);
    let payload;

    switch (self._parser) {
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

    if (payload !== undefined) res = { ...res, payload };

    return res;
  };

  self.arrayBuffer = () => {
    self._parser = EParser.arrayBuffer;

    return exec();
  };

  self.blob = () => {
    self._parser = EParser.blob;

    return exec();
  };

  self.formData = () => {
    self._parser = EParser.formData;

    return exec();
  };

  self.json = () => {
    self._parser = EParser.json;

    return exec();
  };

  self.text = () => {
    self._parser = EParser.text;

    return exec();
  };

  return self;
}

const enum EParser {
  arrayBuffer = 'arrayBuffer',
  blob = 'blob',
  formData = 'formData',
  json = 'json',
  text = 'text'
}

export interface Vetch {
  _options: VetchOptions;
  _parser: EParser | null;
  arrayBuffer: () => Promise<VetchResponse>;
  blob: () => Promise<VetchResponse>;
  formData: () => Promise<VetchResponse>;
  json: () => Promise<VetchResponse>;
  text: () => Promise<VetchResponse>;
}
