import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/utils.js';

export default class Login {
  #targetSelector;
  #parentSelector;

  constructor(targetSelector = `#${SELECTOR_ID.SIGN_UP_FORM}`, parentSelector = `#${SELECTOR_ID.MAIN_CONTAINER}`) {
    this.#targetSelector = targetSelector;
    this.#parentSelector = parentSelector;
  }

  renderPage() {
    $(this.#parentSelector).innerHTML = this.#getWrapperTemplate();
  }

  renderComponent() {
    $(this.#targetSelector).innerHTML = this.#getTemplate();
  }

  #getWrapperTemplate() {
    return `
      <div test-id="/login" class="wrapper p-10 bg-white">
        <div class="heading">
          <h2>👋 로그인</h2>
        </div>
        <form id="${SELECTOR_ID.LOG_IN_FORM}" name="login" class="form"></form>
      </div>
    `;
  }

  #getTemplate() {
    return `
      <div class="input-control">
        <label for="email" class="input-label" hidden>이메일</label>
        <input type="email" id="email" name="email" class="input-field" placeholder="이메일" required />
      </div>
      <div class="input-control">
        <label for="password" class="input-label" hidden>비밀번호</label>
        <input type="password" id="password" name="password" class="input-field" placeholder="비밀번호" />
      </div>
      <div class="input-control w-100">
        <button type="submit" name="submit" class="input-submit w-100 bg-cyan-300">확인</button>
      </div>
      <p class="text-gray-700 pl-2">
        아직 회원이 아니신가요?
        <a id="signup-button" href="/signup">회원가입</a>
      </p>
    `;
  }
}
