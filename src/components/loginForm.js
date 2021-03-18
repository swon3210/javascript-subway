import { SELECTOR_ID } from '../constants.js';
import { $ } from '../utils/utils.js';

export default class LoginForm {
  #selector;
  constructor(selector = `#${SELECTOR_ID.LOG_IN_FORM}`) {
    this.#selector = selector;
  }

  createComponent() {
    const parent = $(this.#selector);
    parent.innerHTML = this.#getTemplate();
  }

  update() {
    this.createComponent();
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
