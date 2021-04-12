import { SELECTOR_CLASS, SELECTOR_ID, PATH, STATE_KEY } from '../constants.js';
import delegateNavigatorClickEvent from '../delegators/navigator.js';
import Observer from '../lib/Observer.js';
import { $ } from '../utils/dom.js';

export default class Navigator extends Observer {
  #targetSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.NAVIGATOR}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#state = state;
  }

  renderComponent() {
    const $navigator = $(this.#targetSelector);
    if (!$navigator) return;

    $navigator.innerHTML = this.#getTemplate();
  }

  initEvents() {
    const $navigator = $(this.#targetSelector);
    $navigator && $navigator.addEventListener('click', delegateNavigatorClickEvent);
  }

  #getTemplate() {
    return `
      <a href="${PATH.ROOT}" class="text-black">
        <h1 class="text-center font-bold">🚇 지하철 노선도</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
        <a href="${PATH.STATIONS}" class="${
      SELECTOR_CLASS.NAVIGATOR_BUTTON
    } btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🚉 역 관리
        </a>
        <a href="${PATH.LINES}" class="${
      SELECTOR_CLASS.NAVIGATOR_BUTTON
    } btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🛤️ 노선 관리
        </a>
        <a href="${PATH.SECTIONS}" class="${
      SELECTOR_CLASS.NAVIGATOR_BUTTON
    } btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🔁 구간 관리
        </a>
        <a href="${PATH.SUBWAY}" class="${
      SELECTOR_CLASS.NAVIGATOR_BUTTON
    } btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
          🗺️ 전체 보기
        </a>
        ${
          this.#state.get(STATE_KEY.IS_LOGGED_IN)
            ? `<a id="${SELECTOR_ID.LOG_OUT_BUTTON}" href="${PATH.ROOT}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
              ❌ 로그아웃
            </a>`
            : `<a href="${PATH.LOG_IN}" class="${SELECTOR_CLASS.NAVIGATOR_BUTTON} btn bg-white shadow mx-1 my-1 text-sm d-flex items-center">
              👤 로그인
            </a>`
        }
      </nav>
    `;
  }
}
