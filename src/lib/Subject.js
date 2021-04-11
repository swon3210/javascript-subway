import { STATE_KEY } from '../constants';
import { $ } from '../utils/dom.js';

export default class Subject {
  constructor() {
    this.observers = {
      [STATE_KEY.STATION_LIST]: [],
      [STATE_KEY.LINE_LIST]: [],
      [STATE_KEY.IS_LOGGED_IN]: [],
      [STATE_KEY.TARGET_LINE_ID]: [],
      [STATE_KEY.TARGET_SECTION_LINE_ID]: [],
    };
  }

  subscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = [...newObservers[key], observer];

    this.observers = newObservers;
  }

  unsubscribe(key, observer) {
    const newObservers = Object.assign({}, this.observers);
    newObservers[key] = newObservers[key].filter(currentObserver => currentObserver !== observer);
    this.observers = newObservers;
  }

  notify(key) {
    if (this.observers[key].length > 0) {
      this.observers[key].forEach(observer => {
        observer.renderComponent();
        observer.initEvents && observer.initEvents();
      });
    }
  }

  notifyAll() {
    Object.keys(this.observers).forEach(key => {
      if (this.observers[key].length > 0) {
        this.observers[key].forEach(observer => observer.renderComponent());
      }
    });
  }
}
