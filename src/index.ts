import Vetch, { EParser } from './Vetch';
import { VetchOptions, VetchResponse } from './helper';

export default function vetch(url: string, options?: VetchOptions) {
  if (!url) throw new Error('URL is required');


  const vetch = new Vetch(url, options);

  const exec = async () => {

    return await vetch.exec()
  };

  this.arrayBuffer = () => {
    vetch.parser = EParser.arrayBuffer;

    return exec();
  };

  this.blob = () => {
    vetch.parser = EParser.blob;

    return exec();
  };

  this.formData = () => {
    vetch.parser = EParser.formData;

    return exec();
  };

  this.json = () => {
    vetch.parser = EParser.json;

    return exec();
  };

  this.text = () => {
    vetch.parser = EParser.text;

    return exec();
  };

  return this;
}
