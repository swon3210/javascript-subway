import { SELECTOR_CLASS, SELECTOR_ID } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/querySelector.js';
import ROUTES from '../routes/routes';

export default class Navigator extends Observer {
  #selector;
  #appState;

  constructor(selector = `#${SELECTOR_ID.NAVIGATOR}`, state) {
    super();
    this.#selector = selector;
    this.#appState = state;
  }

  render() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
  }

  #handlePopState(e) {
    const path = e.state.path;
    this.#navigate(path);
  }

  #handleClickMenu(e) {
    e.preventDefault();
    if (!e.target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) return;
    const path = e.target.getAttribute('href');
    history.pushState({ path }, null, path);
    this.#navigate(path);
  }

  initEvents() {
    window.addEventListener('popstate', e => {
      this.#handlePopState.call(this, e);
    });
    $(this.#selector).addEventListener('click', e => {
      this.#handleClickMenu.call(this, e);
    });
  }
  // 각 관리 페이지에서 state를 업데이트 하면 바로 화면에 적용(해당 페이지의 update 호출)
  // navigate할 때는 update를 할 필요가 없음.
  // 그냥 지금 state 그대로, 해당 관리 페이지로 안내해주기만 하면 됨.

  async #navigate(path) {
    const targetPath = ROUTES[path] ? ROUTES[path] : '/';
    const response = await fetch(targetPath);
    const template = await response.text();
    $(`#${SELECTOR_ID.APP}`).innerHTML = template;
    this.render();
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
          <button href="/subway" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1">🗺️ 전체 보기</button>
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
