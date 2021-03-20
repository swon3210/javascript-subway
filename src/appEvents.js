import { sessionStore } from './utils/utils';
import { requestLoginToken } from './api/member';
import { SELECTOR_ID, PATH, SELECTOR_CLASS, SESSION_STORAGE_KEY } from './constants.js';

export default class AppEvents {
  #router;
  #state;

  constructor(state, router) {
    this.#router = router;
    this.#state = state;
  }

  delegateEvents() {
    // 전체 페이지의 click 이벤트를 감시
    document.body.addEventListener('click', e => {
      this.handleClickEvents.call(this, e);
    });

    // 전체 페이지의 submit 이벤트를 감시
    document.body.addEventListener('submit', e => {
      this.handleSubmitEvents.call(this, e);
    });
  }

  handleClickEvents(e) {
    const target = e.target;
    if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
      e.preventDefault();
      const path = target.getAttribute('href');
      if (path !== PATH.LOG_IN && !this.#state.get('accessToken')) {
        history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
        this.#router.navigate.call(this.#router, PATH.ROOT);
        return;
      }
      history.pushState({ path }, null, path);
      this.#router.navigate.call(this.#router, path);
    }

    if (target.id === SELECTOR_ID.LOG_OUT_BUTTON) {
      this.#state.update('accessToken', null);
      history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
      this.#router.navigate.call(this.#router, PATH.ROOT);
    }
  }

  handleSubmitEvents(e) {
    e.preventDefault();
    const target = e.target;
    if (target.id === SELECTOR_ID.LOG_IN_FORM) {
      const { email, password } = e.target;
      requestLoginToken(email.value, password.value).then(accessToken => {
        if (!accessToken) return;
        sessionStore.setItem(SESSION_STORAGE_KEY.TOKEN, accessToken);
        this.#state.update('accessToken', accessToken);
        history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
        this.#router.navigate.call(this.#router, PATH.ROOT);
      });
    }
  }
}
