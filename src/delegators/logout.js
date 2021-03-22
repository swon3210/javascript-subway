import { PATH, SELECTOR_ID, STATE_KEY } from '../constants';
import { state } from '../store.js';
import router from '../router/router.js';

function delegateLoginSubmitEvent(target) {
  if (target.id === SELECTOR_ID.LOG_OUT_BUTTON) {
    onLogOut(target);
  }
}

function onLogOut(target) {
  const path = target.getAttribute('href');
  if (isAuthenticationPath(path) && !state.get(STATE_KEY.IS_LOGGED_IN)) {
    history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate(PATH.ROOT);
    return;
  }
  history.pushState({ path }, null, path);
  router.navigate(path);
}

function isAuthenticationPath(path) {
  return path === PATH.LOG_IN || path === PATH.SIGN_UP;
}

export default delegateLoginSubmitEvent;
