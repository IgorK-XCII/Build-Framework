import { AxiosPromise, AxiosResponse } from 'axios';

interface IAttributes<T> {
  set(valuse: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

interface IEvents {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
interface ISync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): AxiosPromise;
}
interface IHasId {
  id?: number;
}

export class Model<T extends IHasId> {
  constructor(
    private attributes: IAttributes<T>,
    private events: IEvents,
    private sync: ISync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }
  fetch(): void {
    const id = this.get('id');
    if (!id) {
      throw new Error('ID not found');
    }
    this.sync.fetch(id).then((response: T): void => {
      this.set(response);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      });
  }
}
