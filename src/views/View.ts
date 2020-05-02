import { Model } from './../model/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;

  regionMap = (): { [key: string]: string } => ({});

  eventMap = (): { [key: string]: () => void } => ({});

  bindModel = () => {
    this.model.on('change', () => {
      this.render();
    });
  };

  bindEvents = (fragment: DocumentFragment): void => {
    const eventMap = this.eventMap();
    for (const eventKey in eventMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMap[eventKey]);
      });
    }
  };

  mapRegions = (fragment: DocumentFragment) => {
    const regionsMap = this.regionMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      this.regions[key] = fragment.querySelector(selector);
    }
  };

  onRender = (): void => {};

  render = (): void => {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  };
}
