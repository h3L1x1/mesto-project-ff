
export function closePopUp(popUp) {
  popUp.classList.add('popup_is-animated');
  popUp.classList.remove('popup_is-opened');
  if (popUp === profilePopUp) {
      nameInput.value = '';
      jobInput.value = '';
  }
}

export function openPopUp(popUp) {
  popUp.classList.add('popup_is-opened');
  popUp.classList.remove('popup_is-animated');
}