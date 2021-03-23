import { SELECTOR_CLASS } from '../constants.js';
import { $ } from '../utils/dom.js';

export function delegateModalClickEvent(event) {
  const { target } = event;
  if (target.classList.contains(SELECTOR_CLASS.MODAL_OPEN_BUTTON)) {
    onOpenModal();
  }

  if (target.closest(`.${SELECTOR_CLASS.MODAL_CLOSE}`)) {
    onCloseModal();
  }
}

function onOpenModal() {
  $(`.${SELECTOR_CLASS.MODAL}`).classList.add('open');
}

function onCloseModal() {
  $(`.${SELECTOR_CLASS.MODAL}`).classList.remove('open');
}
