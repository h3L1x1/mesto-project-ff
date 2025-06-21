import {toggleButtonState} from "../index.js"

export function clearValidation(formElement) { 
  if (!formElement) {
    return
  }
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    hideError(inputElement); 
    });

  toggleButtonState(inputList, buttonElement);
}

export const enableValidation = () => {

    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

 export function showError(elem) {
  elem.classList.add('popup__input-type-error');

  let errorElem;
  if (elem.name === 'name') {
    errorElem = elem.parentNode.querySelector('.edit__profile-name-input-error');
  } 
  else if (elem.name === 'description') {
    errorElem = elem.parentNode.querySelector('.edit__profile-description-input-error');
  } 
  else if (elem.name === 'place-name') {
    errorElem = elem.parentNode.querySelector('.place-name-input-error');
  }
  else if (elem.name === 'link') {
    errorElem = elem.parentNode.querySelector('.link-input-error');
  }

  if (errorElem) {
    errorElem.classList.add('form__input-error-active');
    errorElem.classList.remove('form__input-error');

    let errorMessage = '';

    if (elem.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле.';
    } else if (elem.validity.tooShort) {
      errorMessage = `Текст должен быть не короче ${elem.minLength} символов. Длина текста сейчас: ${elem.value.length} символ.`;
    } else if (elem.validity.typeMismatch) { 
      errorMessage = 'Введите адрес сайта.';
    } else {
      errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';
    }

    errorElem.textContent = errorMessage;
  }
}


 export function hideError(elem) {
  elem.classList.remove('popup__input-type-error');

  let errorElem;
  if (elem.name === 'name') {
    errorElem = elem.parentNode.querySelector('.edit__profile-name-input-error'); 
  } 
  else if (elem.name === 'description') {
    errorElem = elem.parentNode.querySelector('.edit__profile-description-input-error'); 
  } else if (elem.name === 'place-name') {
    errorElem = elem.parentNode.querySelector('.place-name-input-error');
  } else if (elem.name === 'link') {
    errorElem = elem.parentNode.querySelector('.link-input-error');
  }

  if (errorElem) {
    errorElem.classList.remove('form__input-error-active');
    errorElem.classList.add('form__input-error');
    errorElem.textContent = '';
  }
}

 export function checkInputValidity(inputElement) { 

  if (!inputElement.validity.valid) {
     showError(inputElement); 
  } else {
     hideError(inputElement); 
  }
}

 export function setEventListeners(formElement) {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement); 
      toggleButtonState(inputList, buttonElement); 
    });
  });

  toggleButtonState(inputList, buttonElement);

  
}

