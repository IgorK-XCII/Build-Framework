type Callback = () => void;

export class Eventing {
  private event: { [event: string]: Array<Callback> } = {};

  on = (eventName: string, callback: Callback): void => {
    if (!this.event[eventName]) {
      this.event[eventName] = [callback];
      return;
    }
    this.event[eventName].push(callback);
  };

  trigger = (eventName: string): void => {
    if (!this.event[eventName]) {
      return;
    }
    this.event[eventName].forEach((callback) => {
      callback();
    });
  };
}
