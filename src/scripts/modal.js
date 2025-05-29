
export function closePopUp(popUp) {
  popUp.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

export function openPopUp(popUp) {
  popUp.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopUp(openedPopup); // Закрываем активный попап
    }
  }
}
