import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      stationList: ['사당', '방배'],
      lineList: ['1호선', '2호선'],
      isLoggedIn: false,
    };
  }

  update(key, data = {}) {
    this.#state = { ...this.#state, [key]: data };
    this.notify(key);
  }

  updateAll(data = {}) {
    this.#state = { ...this.#state, data };
    this.notifyAll();
  }

  get() {
    return Object.assign({}, this.#state);
  }
}
