
export function closePopUp(popUp, profilePopUp, nameInput, jobInput) {
  
  popUp.classList.add('popup_is-animated');
  popUp.classList.remove('popup_is-opened');
}

export function openPopUp(popUp) {
  popUp.classList.add('popup_is-opened');
}