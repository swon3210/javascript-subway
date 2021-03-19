import { isObject } from '../utils/utils.js';
import Subject from './Subject.js';

export default class State extends Subject {
  #state;

  constructor() {
    super();
    this.#state = {
      stationList: ['사당', '방배'],
      lineList: ['1호선', '2호선'],
      accessToken: null,
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

  get(key) {
    if (!key) return;
    if (Array.isArray(this.#state[key])) {
      return [...this.#state[key]];
    }
    if (isObject(this.#state[key])) {
      return { ...this.#state[key] };
    }
    return this.#state[key];
  }

  getAll() {
    return Object.assign({}, this.#state);
  }
}
