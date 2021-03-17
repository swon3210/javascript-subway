import './assets/scss/index.scss';
import Navigator from './components/navigator.js';
import { SELECTOR_ID } from './constants';
import State from './lib/State.js';

// 앱 상태 초기화
const state = new State();

const navigator = new Navigator(`#${SELECTOR_ID.NAVIGATOR}`, state);

history.pushState({ path: '/' }, null, '/');
navigator.render();
navigator.initEvents();
