import { PATH, SELECTOR_CLASS, SELECTOR_ID, STATE_KEY } from '../constants';
import router from '../router/router';
import { state } from '../store.js';

function delegateNavigatorClickEvent(e) {
  if (e.target.id === SELECTOR_ID.SIGN_UP_BUTTON || e.target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
    e.preventDefault();
    onPageMove(e.target);
  }
}

function onPageMove(target) {
  const path = target.getAttribute('href');
  if (!isAuthenticationPath(path) && !state.get(STATE_KEY.IS_LOGGED_IN)) {
    history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate(PATH.ROOT);
    return;
  }
  history.pushState({ path }, null, path);
  router.navigate(path);
}

const isAuthenticationPath = path => {
  return path === PATH.LOG_IN || path === PATH.SIGN_UP;
};

export default delegateNavigatorClickEvent;
