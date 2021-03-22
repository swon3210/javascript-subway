import delegateNavigatorClickEvent from './delegators/navigator.js';
import delegateLoginSubmitEvent from './delegators/login.js';
import delegateSignUpSubmitEvent from './delegators/signup.js';
import delegateStationSubmitEvent from './delegators/station.js';

const delegateEvents = () => {
  document.body.addEventListener('click', handleClickEvents);
  document.body.addEventListener('submit', e => {
    console.log('submitted');
    handleSubmitEvents(e);
  });
};

function handleClickEvents(e) {
  delegateNavigatorClickEvent(e);
}

function handleSubmitEvents(e) {
  e.preventDefault();
  const target = e.target;
  delegateLoginSubmitEvent(target);
  delegateSignUpSubmitEvent(target);
  delegateStationSubmitEvent(target);
}

export default delegateEvents;
