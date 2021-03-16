import { SELECTOR_CLASS, SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/querySelector.js';

export default class Navigator extends Observer {
  #selector;
  #routes;
  #appState;

  constructor(selector = `#${SELECTOR_ID.NAVIGATOR}`, routes, state) {
    super();
    this.#selector = selector;
    this.#routes = routes;
    this.#appState = state;
  }

  render() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
  }

  initEvents() {
    window.addEventListener('popstate', e => {
      const path = e.state.path;
      const targetPath = this.#routes[path] ? this.#routes[path] : '/';
      this.#navigate(targetPath);
    });

    $(this.#selector).addEventListener('click', e => {
      if (!e.target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) return;
      e.preventDefault();
      const path = e.target.getAttribute('href');
      history.pushState({ path }, null, path);
      console.log(history);
      this.#navigate(path);
    });
  }

  async #navigate(path) {
    const targetPath = this.#routes[path] ? this.#routes[path] : '/';
    const response = await fetch(targetPath);
    const data = await response.text();
    $(this.#selector).innerHTML = data;
  }

  // TODO : 이거 굳이 동적으로 넣는 이유가 뭔지 알아보기
  #getTemplate() {
    return `
      <a href="/" class="text-black">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        <a href="/stations" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 ">
          🚉 역 관리
        </a>
        <a class="my-1">
          <button href="/lines" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">🛤️ 노선 관리</button>
        </a>
        <a class="my-1">
          <button href="/sections" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">🔁 구간 관리</button>
        </a>
        <a class="my-1">
          <button href="/" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">🗺️ 전체 보기</button>
        </a>
        <a class="my-1">
          <button href="/search" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">🔎 길 찾기</button>
        </a>
        <a class="my-1">
          <button href="/signup" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">👤 로그인</button>
        </a>
      </nav>
    `;
  }
}
