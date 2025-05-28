import { createCard, deleteCard, likeClickHandler } from "./scripts/card.js";
import { closePopUp, openPopUp } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js"
import "./pages/index.css";
import logo from './images/logo.svg'

const logoImage = document.getElementById('logo__image');
logoImage.src = logo

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
  openPopUp(profilePopUp)
});


allCloseBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
      const popUp = closeBtn.closest('.popup');
      if (popUp) {
          closePopUp(popUp, profilePopUp, nameInput, jobInput);
      }
  });
});

profilePopUp.addEventListener('click', (evt) => {
  if (evt.target === profilePopUp) {
    closePopUp(profilePopUp, profilePopUp, nameInput, jobInput);
  }
});


// cards block

const profileCardsBtn = document.querySelector('.profile__add-button');
const profileCardsPopUp = document.querySelector('.popup_type_new-card');


profileCardsBtn.addEventListener('click', () => openPopUp(profileCardsPopUp));

profileCardsPopUp.addEventListener('click', (evt) => {
  if (evt.target === profileCardsPopUp) {
    closePopUp(profileCardsPopUp);
  }
});

// save cards

const cardForm = document.forms['new-place'];
const imagePopUp = document.querySelector('.popup_type_image')

function cardHandleFormSubmit(evt) {
  evt.preventDefault();
closePopUp(profileCardsPopUp);
}

cardForm.addEventListener('submit', cardHandleFormSubmit);

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardName = cardForm.elements['place-name'].value;
  const linkCard = cardForm.elements.link.value;
 
  const newCardData = { name: cardName, link: linkCard}

  const newCard = createCard(newCardData, deleteCard, imageClickHandler, likeClickHandler);
  placesList.prepend(newCard);

  cardForm.reset();
    
})

imagePopUp.addEventListener('click', (evt) => {
  if (evt.target === imagePopUp) {
    closePopUp(imagePopUp);
  }
})









