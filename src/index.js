import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import StationList from './components/stationList.js';
import LineList from './components/lineList.js';
import LoginForm from './components/loginForm.js';
import SignupForm from './components/signupForm';
import { SELECTOR_ID, PATH, SELECTOR_CLASS, SESSION_STORAGE_KEY } from './constants.js';
import State from './lib/State.js';
import Router from './router/router.js';
import { $, sessionStore } from './utils/utils';
import { requestLoginToken } from './api/member';

// 앱 상태 초기화
const state = new State();

// 앱 컴포넌트 초기화
const stationList = new StationList(state, `#${SELECTOR_ID.STATION_LIST}`);
const lineList = new LineList(state, `#${SELECTOR_ID.LINE_LIST}`);
const loginForm = new LoginForm(`#${SELECTOR_ID.LOG_IN_FORM}`);
const signupForm = new SignupForm(`#${SELECTOR_ID.SIGN_UP_FORM}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`);

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.initRouteEvent();
router.register(PATH.STATIONS, stationList);
router.register(PATH.LINES, lineList);
router.register(PATH.LOG_IN, loginForm);
router.register(PATH.SIGN_UP, signupForm);
router.register(PATH.ROOT, navigator);

// TODO: 일단 넘어가
document.body.addEventListener('click', e => {
  const target = e.target;
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
    e.preventDefault();
    const path = target.getAttribute('href');
    if (path !== PATH.LOG_IN && !state.get().isLoggedIn) {
      history.pushState({ path: '/' }, null, '/');
      router.navigate.call(router, '/');
      return;
    }
    history.pushState({ path }, null, path);
    router.navigate.call(router, path);
  }
});

document.body.addEventListener('submit', e => {
  e.preventDefault();
  const target = e.target;
  if (target.id === SELECTOR_ID.LOG_IN_FORM) {
    const { email, password } = e.target;
    requestLoginToken(email.value, password.value).then(accessToken => {
      if (!accessToken) return;
      sessionStore.setItem(SESSION_STORAGE_KEY.TOKEN, accessToken);
      state.update('isLoggedIn', true);
      history.pushState({ path: '/' }, null, '/');
      router.navigate.call(router, '/');
    });
  }
});

state.subscribe('isLoggedIn', navigator);

// 네비게이터 렌더링
navigator.createComponent();
