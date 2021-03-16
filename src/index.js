import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import { SELECTOR_ID } from './constants';
import State from './lib/State.js';
import ROUTES from './routes/routes';

// 앱 상태 초기화
const state = new State();

// 라우터 등록

// 앱 렌더

const navigator = new Navigator(`#${SELECTOR_ID.APP}`, ROUTES, state);

history.pushState({ path: '/' }, null, '/');
navigator.render();
navigator.initEvents();
