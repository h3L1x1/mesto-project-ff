import { createCard, deleteCard, likeClickHandler } from "./scripts/card.js";
import { closePopUp, openPopUp, } from "./scripts/modal.js";
import { addCardToServer, changeProfileData, loadCards, changeAvatarData, loadProfile} from "./scripts/api.js";
import { clearValidation, enableValidation } from "./scripts/validation.js";
import "./pages/index.css";
import logo from './images/logo.svg'

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'form__input-error-active',
  validationRegex: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  validationMessages: {
    regexMismatch: "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
  }
};

const logoImage = document.getElementById('logo__image');
logoImage.src = logo

document.addEventListener('DOMContentLoaded', async () => {
    const popups = document.querySelectorAll('.popup'); 
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
});

enableValidation(validationConfig);


const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupElement = document.querySelector('.popup_type_image');


function imageClickHandler(cardData) { 
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopUp(popupElement);
}

 let currentUserId = null;

async function init() {

  try {
    const [profile, cards] = await Promise.all([
      loadProfile(),
      loadCards()
    ]);

    currentUserId = profile._id;

    nameProfileTitle.textContent = profile.name;
    descriptionProfile.textContent = profile.about;
    profileImage.style.backgroundImage = `url('${profile.avatar}')`;
    
    nameInput.value = profile.name;
    jobInput.value = profile.about;

    cards.forEach(card => {
      const cardElement = createCard(
        card,
        (element) => element.remove(),
        imageClickHandler,
        likeClickHandler,
        currentUserId
      );
      placesList.append(cardElement);
    });
    
  } catch (err) {
    console.error('Ошибка инициализации:', err);
  }
}

init();

// profile block

const profileEditBtn = document.querySelector('.profile__edit-button');
const profilePopUp = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description');
const nameProfileTitle = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const allCloseBtns = document.querySelectorAll('.popup__close');
const profileImageWrapper = document.querySelector('.profile__image-wrapper');
const profileImage = document.querySelector('.profile__image');
const linkUrl = document.querySelector('.popup__input_type_url');
const profileImagePopUp = document.querySelector('.popup_type_profile__image');
const avatarForm = document.forms['edit-avatar'];
const submitBtn = document.querySelector('.button');

async function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  try {
    
    renderLoading(true, submitBtn);
    await changeProfileData(nameInput.value, jobInput.value);

    
    nameProfileTitle.textContent = nameInput.value;
    descriptionProfile.textContent = jobInput.value;
  
    closePopUp(profilePopUp);
    
  } catch (err) {
    console.error('Ошибка сохранения профиля:', err);
    
  } finally {
    renderLoading(false, submitBtn);
  }
}

profileForm.addEventListener('submit', handleProfileFormSubmit);


async function handleProfileImageFormSubmit(evt) {
  evt.preventDefault(); 

  const newLink = linkUrl.value; 
  if (!newLink) return

try {
  renderLoading(true, submitBtn);
  const updatedprofileImage = await changeAvatarData(newLink);

    profileImage.style.backgroundImage = `url('${updatedprofileImage.avatar}')`;
  
  evt.target.reset();
  closePopUp(profileImagePopUp);
}

catch (err) {
 console.error('Ошибка сохранения профиля:', err);
}

finally {
  renderLoading(false, submitBtn);
}
}

profileImagePopUp.addEventListener('submit', handleProfileImageFormSubmit);

profileEditBtn.addEventListener('click', () => {
  nameInput.value = nameProfileTitle.textContent;
  jobInput.value =  descriptionProfile.textContent;
  openPopUp(profilePopUp, profileForm);
  clearValidation(profileForm, validationConfig);
  enableValidation(validationConfig);
});

profileImageWrapper.addEventListener('click', () => {
  openPopUp(profileImagePopUp, profileForm);
  clearValidation(avatarForm, validationConfig);
  enableValidation(validationConfig);
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

profileImagePopUp.addEventListener('click', (evt) => {
if (evt.target === profileImagePopUp) {
  closePopUp(profileImagePopUp);
}
})


// cards block

const profileCardsBtn = document.querySelector('.profile__add-button');
const profileCardsPopUp = document.querySelector('.popup_type_new-card');


profileCardsBtn.addEventListener('click', () =>  {
  openPopUp(profileCardsPopUp, profileForm);
  clearValidation(cardForm, validationConfig);
  enableValidation(validationConfig);
});

profileCardsPopUp.addEventListener('click', (evt) => {
  if (evt.target === profileCardsPopUp) {
    closePopUp(profileCardsPopUp);
  }
});

// save cards

const cardForm = document.forms['new-place'];
const imagePopUp = document.querySelector('.popup_type_image');

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardName = cardForm.elements['place-name'].value;
  const linkCard = cardForm.elements.link.value;

  renderLoading(true, submitBtn); 

  addCardToServer(cardName, linkCard)
    .then(cardData => {
      
      const newCard = createCard(cardData, deleteCard, imageClickHandler, likeClickHandler);
      placesList.prepend(newCard);
      
      cardForm.reset();
      closePopUp(profileCardsPopUp);
    })
    .catch(err => {
      console.error('Ошибка создания карточки:', err);
    })
    .finally(() => {
      renderLoading(false, submitBtn);
    });
});

imagePopUp.addEventListener('click', (evt) => {
  if (evt.target === imagePopUp) {
    closePopUp(imagePopUp);
  }
})

function renderLoading(isLoading, button, text = 'Сохранить', loadingText = 'Сохранение...') {
  button.textContent = isLoading ? loadingText : text;
  button.disabled = isLoading;
}











