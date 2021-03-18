import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import StationList from './components/stationList.js';
import LineList from './components/lineList.js';
import LoginForm from './components/loginForm.js';
import SignupForm from './components/signupForm';
import { SELECTOR_ID, PATH, SELECTOR_CLASS } from './constants.js';
import State from './lib/State.js';
import Router from './router/router.js';

// 앱 상태 초기화
const state = new State();

// 앱 컴포넌트 초기화
const stationList = new StationList(state.get(), `#${SELECTOR_ID.STATION_LIST}`);
const lineList = new LineList(state.get(), `#${SELECTOR_ID.LINE_LIST}`);
const loginForm = new LoginForm(`#${SELECTOR_ID.LOG_IN_FORM}`);
const signupForm = new SignupForm(`#${SELECTOR_ID.SIGN_UP_FORM}`);

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.initRouteEvent();
router.register(PATH.STATIONS, stationList);
router.register(PATH.LINES, lineList);
router.register(PATH.LOG_IN, loginForm);
router.register(PATH.SIGN_UP, signupForm);

// 네이게이션 컴포넌트 초기화
const navigator = new Navigator(`#${SELECTOR_ID.NAVIGATOR}`);

// TODO: 일단 넘어가
document.body.addEventListener('click', e => {
  if (e.target.id !== SELECTOR_ID.SIGN_UP_BUTTON) return;
  e.preventDefault();

  const path = e.target.getAttribute('href');
  history.pushState({ path }, null, path);
  router.navigate.call(router, path);
});

// 네비게이터 렌더링
navigator.createComponent();
navigator.initPushStateEvent(path => router.navigate.call(router, path));
