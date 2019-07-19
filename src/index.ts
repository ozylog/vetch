import Vetch, { EParser, VetchOptions } from './Vetch';
export { VetchOptions, VetchResponse } from './Vetch';

export default function vetch(url: string, options?: VetchOptions) {
  if (!url) throw new Error('URL is required');

  const v = new Vetch(url, options);

  this.then = (resolve: any, reject: any) => v.exec().then(resolve).catch(reject);

  this.arrayBuffer = () => {
    v.parser = EParser.arrayBuffer;

    return this;
  };

  this.blob = () => {
    v.parser = EParser.blob;

    return this;
  };

  this.formData = () => {
    v.parser = EParser.formData;

    return this;
  };

  this.json = () => {
    v.parser = EParser.json;

    return this;
  };

  this.text = () => {
    v.parser = EParser.text;

    return this;
  };

  return this;
}

interface Options {
  fetch: any;
}

export function setVetch({ fetch }: Options) {
  if (fetch) Vetch.fetch = fetch;
}
