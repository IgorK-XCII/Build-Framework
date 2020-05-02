import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';

export class Collection<T, K> {
  models: Array<T> = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch = async (): Promise<void> => {
    try {
      const response: AxiosResponse<Array<K>> = await axios.get(this.rootUrl);
      this.models = [];
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
        this.trigger('change');
      });
    } catch (error) {
      console.error(error);
    }
  };
}
