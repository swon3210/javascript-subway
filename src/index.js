import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import StationList from './components/stations.js';
import LineList from './components/lines.js';
import { SELECTOR_ID, PATH } from './constants.js';
import State from './lib/State.js';
import Router from './router/router.js';

// 앱 상태 초기화
const state = new State();

// 앱 컴포넌트 초기화
const stationList = new StationList(state.get(), `#${SELECTOR_ID.STATION_LIST}`);
const lineList = new LineList(state.get(), `#${SELECTOR_ID.LINE_LIST}`);

// 라우터 생성
const router = new Router();

// 라우팅 등록
router.initRouteEvent();
router.register(PATH.STATIONS, stationList);
router.register(PATH.LINES, lineList);

// 네이게이션 컴포넌트 초기화
const navigator = new Navigator(`#${SELECTOR_ID.NAVIGATOR}`);

// 네비게이터 렌더링
navigator.render();
navigator.initPushStateEvent(path => router.navigate.call(router, path));
