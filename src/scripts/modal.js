import {clearValidation} from "./validation.js"

export function closePopUp(popUp) {
  popUp.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);

}

export function openPopUp(popUp, formElement) {
  popUp.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  clearValidation(formElement);
}

export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopUp(openedPopup); 
    }
  }
}



