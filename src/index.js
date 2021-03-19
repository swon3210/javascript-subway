import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import Station from './components/station.js';
import Line from './components/line.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';
import Main from './components/main.js';
import { SELECTOR_ID, PATH, SELECTOR_CLASS, SESSION_STORAGE_KEY } from './constants.js';
import State from './lib/State.js';
import Router from './router/router.js';
import { sessionStore } from './utils/utils';
import { requestLoginToken } from './api/member';

// 앱 상태 초기화
const state = new State();

// 앱 컴포넌트 생성
const main = new Main(state, `#${SELECTOR_ID.GUIDE_WRAPPER}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const station = new Station(state, `#${SELECTOR_ID.STATION_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const line = new Line(state, `#${SELECTOR_ID.LINE_LIST}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const login = new Login(`#${SELECTOR_ID.LOG_IN_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const signUp = new SignUp(`#${SELECTOR_ID.SIGN_UP_FORM}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);
const navigator = new Navigator(state, `#${SELECTOR_ID.NAVIGATOR}`, `#${SELECTOR_ID.MAIN_CONTAINER}`);

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.register(PATH.STATIONS, station);
router.register(PATH.LINES, line);
router.register(PATH.LOG_IN, login);
router.register(PATH.SIGN_UP, signUp);
router.register(PATH.ROOT, navigator);
router.register(PATH.ROOT, main);
router.initRouteEvent();

// TODO: 로그인 API 에러 해결하기
// TODO: 로그아웃 기능 구현
// TODO: 별도의 객체로 빼던가 하기(이벤트 리스너 등록하는 객체)
// TODO: Main page component 만들기 => accessToken 여부에 따라서 보여주는 화면 다름

// 전체 페이지의 click 이벤트를 감시
document.body.addEventListener('click', e => {
  const target = e.target;
  if (target.id === SELECTOR_ID.SIGN_UP_BUTTON || target.classList.contains(SELECTOR_CLASS.NAVIGATOR_BUTTON)) {
    e.preventDefault();
    const path = target.getAttribute('href');
    if (path !== PATH.LOG_IN && !state.get('accessToken')) {
      history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
      router.navigate.call(router, PATH.ROOT);
      return;
    }
    history.pushState({ path }, null, path);
    router.navigate.call(router, path);
  }

  if (target.id === SELECTOR_ID.LOG_OUT_BUTTON) {
    state.update('accessToken', null);
    history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
    router.navigate.call(router, PATH.ROOT);
  }
});

// 전체 페이지의 submit 이벤트를 감시
document.body.addEventListener('submit', e => {
  e.preventDefault();
  const target = e.target;
  if (target.id === SELECTOR_ID.LOG_IN_FORM) {
    const { email, password } = e.target;
    requestLoginToken(email.value, password.value).then(accessToken => {
      if (!accessToken) return;
      sessionStore.setItem(SESSION_STORAGE_KEY.TOKEN, accessToken);
      state.update('accessToken', accessToken);
      history.pushState({ path: PATH.ROOT }, null, PATH.ROOT);
      router.navigate.call(router, PATH.ROOT);
    });
  }
});

// 옵저버 등록
state.subscribe('accessToken', navigator);

// 네비게이터 렌더링
navigator.renderComponent();
