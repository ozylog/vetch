import Vetch, { EParser } from './Vetch';
import { VetchOptions } from './helper';

export default function vetch(url: string, options?: VetchOptions) {
  if (!url) throw new Error('URL is required');

  const vetch = new Vetch(url, options);

  this.then = (resolve: any, reject:any) => vetch.exec().then(resolve).catch(reject);

  this.arrayBuffer = () => {
    vetch.parser = EParser.arrayBuffer;

    return this;
  };

  this.blob = () => {
    vetch.parser = EParser.blob;

    return this;
  };

  this.formData = () => {
    vetch.parser = EParser.formData;

    return this;
  };

  this.json = () => {
    vetch.parser = EParser.json;

    return this;
  };

  this.text = () => {
    vetch.parser = EParser.text;

    return this;
  };

  return this;
}
