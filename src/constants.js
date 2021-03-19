export const SELECTOR_ID = Object.freeze({
  APP: 'app',
  NAVIGATOR: 'navigator',
  MAIN_CONTAINER: 'main-container',
  STATION_LIST: 'station-list',
  LINE_LIST: 'line-list',
  LOG_IN_FORM: 'login-form',
  LOG_IN_BUTTON: 'login-button',
  LOG_OUT_BUTTON: 'logout-button',
  SIGN_UP_FORM: 'signup-form',
  SIGN_UP_BUTTON: 'signup-button',
  GUIDE_WRAPPER: 'guide-wrapper',
});

export const SELECTOR_CLASS = Object.freeze({
  NAVIGATOR_BUTTON: 'js-navigator__button',
  CREATE_LINE_BUTTON: 'create-line-btn',
});

export const PATH = Object.freeze({
  ROOT: '/',
  LINES: '/lines',
  STATIONS: '/stations',
  SECTIONS: '/sections',
  LOG_IN: '/login',
  SIGN_UP: '/signup',
  SEARCH: '/search',
  SUBWAY: '/subway',
  LOG_OUT: '/logout',
});

export const SESSION_STORAGE_KEY = Object.freeze({
  TOKEN: 'accessToken',
});
