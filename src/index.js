import { createCard, deleteCard, likeClickHandler } from "./scripts/card.js";
import { closePopUp, openPopUp, } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js"
import { showError, hideError, enableValidation, setEventListeners, checkInputValidity, clearValidation } from "./scripts/validation.js";
import "./pages/index.css";
import logo from './images/logo.svg'

const logoImage = document.getElementById('logo__image');
logoImage.src = logo

document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup'); 
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupElement = document.querySelector('.popup_type_image');


 function imageClickHandler(targetImage) { 
    const imageSrc = targetImage.src;
    const imageName = targetImage.alt;

    popupImage.src = imageSrc;
    popupImage.alt = imageName;
    popupCaption.textContent = imageName;

    openPopUp(popupElement);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, imageClickHandler, likeClickHandler);
  placesList.appendChild(cardElement);
});

// profile block

const profileEditBtn = document.querySelector('.profile__edit-button');
const profilePopUp = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description');
const nameProfileTitle = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const allCloseBtns = document.querySelectorAll('.popup__close');


function profileHandleFormSubmit(evt) {
  evt.preventDefault();
  nameProfileTitle.textContent = nameInput.value;
  descriptionProfile.textContent = jobInput.value;
  closePopUp(profilePopUp);
};

profileForm.addEventListener('submit', profileHandleFormSubmit);

profileEditBtn.addEventListener('click', () => {
  nameInput.value = nameProfileTitle.textContent;
  jobInput.value =  descriptionProfile.textContent;
  openPopUp(profilePopUp, profileForm);

  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameInput.value,
    about: jobInput.value,
  })
}); 
});


allCloseBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
      const popUp = closeBtn.closest('.popup');
      if (popUp) {
          closePopUp(popUp);
      }
  });
});

profilePopUp.addEventListener('click', (evt) => {
  if (evt.target === profilePopUp) {
    closePopUp(profilePopUp);
  }
});


// cards block

const profileCardsBtn = document.querySelector('.profile__add-button');
const profileCardsPopUp = document.querySelector('.popup_type_new-card');


profileCardsBtn.addEventListener('click', () => openPopUp(profileCardsPopUp, profileForm));

profileCardsPopUp.addEventListener('click', (evt) => {
  if (evt.target === profileCardsPopUp) {
    closePopUp(profileCardsPopUp);
  }
});

// save cards

const cardForm = document.forms['new-place'];
const imagePopUp = document.querySelector('.popup_type_image')

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardName = cardForm.elements['place-name'].value;
  const linkCard = cardForm.elements.link.value;
 
  const newCardData = { name: cardName, link: linkCard}

  const newCard = createCard(newCardData, deleteCard, imageClickHandler, likeClickHandler);
  placesList.prepend(newCard);

  cardForm.reset();
  closePopUp(profileCardsPopUp);

  fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
  method: 'POST',
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: cardName,
    link: linkCard,
  })
}); 
    
})

imagePopUp.addEventListener('click', (evt) => {
  if (evt.target === imagePopUp) {
    closePopUp(imagePopUp);
  }
})

// validation

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {

     if (inputElement.value === "") {
    return !inputElement.validity.valid; 
  }

    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

    if (inputElement.type === 'text' && (inputElement.name === 'name' || inputElement.name === 'description' || inputElement.name === 'place-name')) {
      if (!nameRegex.test(inputElement.value)) {
        showError(inputElement);
        return true; 
      }
    }

    return !inputElement.validity.valid; 
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('button_inactive');
  }
}

enableValidation();

//api 

  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });


   fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });









