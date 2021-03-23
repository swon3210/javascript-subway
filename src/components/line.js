import { SELECTOR_CLASS, SELECTOR_ID, PAGE_TITLE, FILE_PATH } from '../constants.js';
import Observer from '../lib/Observer.js';
import { $, setHeadTagAttribute } from '../utils/dom.js';
import { colorOptions } from '../utils/mock.js';

export default class Line extends Observer {
  #targetSelector;
  #parentSelector;
  #state;

  constructor(state, targetSelector = `#${SELECTOR_ID.LINE_LIST}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    super();
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
    this.#state = state;
  }

  renderPage() {
    setHeadTagAttribute(PAGE_TITLE.LINES, FILE_PATH.LINES_CSS);
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
    $(`.${SELECTOR_CLASS.MODAL}`).innerHTML = this.#getModalTemplate();
    $(`.${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER}`).innerHTML = colorOptions
      .map((color, index) => this.#getSubwayLineColorOptionTemplate(color, index))
      .join('');
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getListListTemplate();
  }

  #getWrapperTemplate() {
    return `
      <div data-test-id="lines" class="wrapper bg-white p-10 fade-in">
        <div class="heading d-flex">
          <h2 class="mt-1 w-100">🛤️ 노선 관리</h2>
          <button type="button" class="${SELECTOR_CLASS.MODAL_OPEN_BUTTON} modal-trigger-btn bg-cyan-300 ml-2">노선 추가</button>
        </div>
        <ul id="${SELECTOR_ID.LINE_LIST}" class="mt-3 pl-0"></ul>
      </div>
    `;
  }

  #getListListTemplate() {
    return this.#state
      .get('lineList')
      .map(line => this.#getLineTemplate(line.name))
      .join('');
  }

  #getLineTemplate(lineName) {
    return `
      <li class="d-flex items-center py-2 relative">
        <span class="subway-line-color-dot bg-blue-400"></span>
        <span class="w-100 pl-6 subway-line-list-item-name">${lineName}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1">수정</button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm">삭제</button>
      </li>
      <hr class="my-0" />
    `;
  }

  #getModalTemplate() {
    return `
      <div class="${SELECTOR_CLASS.MODAL_INNER} p-8">
        <button class="${SELECTOR_CLASS.MODAL_CLOSE}">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🛤️ 노선 추가</h2>
        </header>
        <form>
          <div class="input-control">
            <label for="subway-line-name" class="input-label" hidden>노선 이름</label>
            <input
              type="text"
              id="subway-line-name"
              name="subway-line-name"
              class="input-field"
              placeholder="노선 이름"
              required
            />
          </div>
          <div class="input-control">
            <label for="departure-time" class="input-label" hidden>첫차 시간</label>
            <input
              type="text"
              id="departure-time"
              name="departure-time"
              class="input-field"
              placeholder="첫차시간 HH:MM"
              required
            />
            <label for="departure-time" class="input-label" hidden>막차 시간</label>
            <input
              type="text"
              id="arrival-time"
              name="arrival-time"
              class="input-field mx-2"
              placeholder="막차 시간 HH:MM"
              required
            />
            <label for="interval-time" class="input-label" hidden>간격 시간</label>
            <input type="text" id="interval-time" name="arrival-time" class="input-field" placeholder="간격" required />
          </div>
          <div class="input-control">
            <div>
              <label for="subway-line-color" class="input-label" hidden>간격 시간</label>
              <input
                type="text"
                id="subway-line-color"
                name="subway-line-color"
                class="input-field"
                placeholder="색상을 아래에서 선택해주세요."
                disabled
                required
              />
            </div>
          </div>
          <div class="${SELECTOR_CLASS.SUBWAY_LINE_COLOR_PICKER} px-2"></div>
          <div class="d-flex justify-end mt-3">
            <button type="submit" name="submit" class="input-submit bg-cyan-300">확인</button>
          </div>
        </form>
      </div>
    `;
  }

  #getSubwayLineColorOptionTemplate(color, index) {
    const hasNewLine = (index + 1) % 7 === 0;
    return `<button type="button" class="color-option bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
  }
}
