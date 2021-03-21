import { PATH, SELECTOR_CLASS, SELECTOR_ID, SESSION_STORAGE_KEY, STATE_KEY } from './constants.js';
import { requestSignUp, requestLoginToken } from './api/member.js';
import { sessionStore } from './utils/utils';

export default class AppEvents {
  #router;
  #state;

  constructor(state, router) {
    this.#router = router;
    this.#state = state;
  }

  delegateEvents() {
    document.body.addEventListener('click', e => {
      this.#handleClickEvents.call(this, e);
    });
    document.body.addEventListener('submit', e => {
      this.#handleSubmitEvents.call(this, e);
    });
  }

  #handleClickEvents(e) {
    const target = e.target;
    if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
      e.preventDefault();
      const path = target.getAttribute('href');
      if (!this.#isAuthenticationPath(path) && !this.#state.get(STATE_KEY.IS_LOGGED_IN)) {
        history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
        this.#router.navigate.call(this.#router, PATH.ROOT);
        return;
      }
      history.pushState({ path }, null, path);
      this.#router.navigate.call(this.#router, path);
    }
  }

  #handleSubmitEvents(e) {
    e.preventDefault();
    const target = e.target;
    if (target.id === SELECTOR_ID.SIGN_UP_FORM) {
      const { email, name, password } = e.target;
      requestSignUp(email.value, name.value, password.value).then(() => {
        history.back();
        // TODO : alert 메세지 상수로 빼기
      }).catch(error => {
        console.log(error);
        alert('회원가입에 실패하였습니다');
      });
    }
    if (target.id === SELECTOR_ID.LOG_IN_FORM) {
      const { email, password } = e.target;
      requestLoginToken(email.value, password.value).then(accessToken => {
        sessionStore.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);
        this.#state.update(STATE_KEY.IS_LOGGED_IN, true);
        history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
        this.#router.navigate.call(this.#router, PATH.ROOT);
      }).catch(error => {
        console.log(error);
        alert('로그인에 실패하셨습니다')
      });
    }
  }

  #isAuthenticationPath(path) {
    return path === PATH.LOG_IN || path === PATH.SIGN_UP;
  }
}
