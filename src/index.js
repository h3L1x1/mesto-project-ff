import { createCard, deleteCard, likeClickHandler } from "./scripts/card.js";
import { closePopUp, openPopUp, } from "./scripts/modal.js";
import { addCardToServer, changeProfileData, renderLoading, getProfileData, loadCards, getCurrentUserId, changeAvatarData} from "./scripts/api.js";
import { showError,  enableValidation} from "./scripts/validation.js";
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

async function loadProfile() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
      }
    });
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

    const userData = await response.json();
    currentUserId = userData._id;

    return userData;
  } 
  catch (err) {
    console.error('Ошибка загрузки профиля:', err);
    throw err;
  }
}

async function init() {
  try {

    const [profile, cards] = await Promise.all([
      loadProfile(),
      loadCards()
    ]);
  
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

async function loadProfileData() {
  try {
    const profileData = await getProfileData();
    
    nameProfileTitle.textContent = profileData.name;
    descriptionProfile.textContent = profileData.about;
    
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
    
  } catch (err) {
    console.error('Ошибка загрузки профиля:', err);
  }
}

loadProfileData();

async function profileHandleFormSubmit(evt) {
  evt.preventDefault();
  
  try {
    
    renderLoading(true, profileForm.querySelector('.button'));
    
    await changeProfileData(nameInput.value, jobInput.value);
  
    nameProfileTitle.textContent = nameInput.value;
    descriptionProfile.textContent = jobInput.value;
  
    closePopUp(profilePopUp);
    
  } catch (err) {
    console.error('Ошибка сохранения профиля:', err);
    
  } finally {
    renderLoading(false, profileForm.querySelector('.button'));
  }
}


profileForm.addEventListener('submit', profileHandleFormSubmit);

async function loadUserData() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
      }
    });
    
    if (response.ok) {
      const user = await response.json();
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
      return user;
    }
  } catch (err) {
    console.error('Ошибка загрузки данных:', err);
  }
}

loadUserData();

async function handleProfileImageFormSubmit(evt) {
  evt.preventDefault(); 

  const newLink = linkUrl.value; 
  if (!newLink) return

try {
  renderLoading(true, avatarForm.querySelector('.button'));
  const updatedprofileImage = await changeAvatarData(newLink);

    profileImage.style.backgroundImage = `url('${updatedprofileImage.avatar}')`;
  
  evt.target.reset();
  closePopUp(profileImagePopUp);
}

catch (err) {
 console.error('Ошибка сохранения профиля:', err);
}

finally {
  renderLoading(false, avatarForm.querySelector('.button'));
}
}

document.addEventListener('DOMContentLoaded', () => {
  loadUserData();
});


profileImagePopUp.addEventListener('submit', handleProfileImageFormSubmit);

profileEditBtn.addEventListener('click', () => {
  nameInput.value = nameProfileTitle.textContent;
  jobInput.value =  descriptionProfile.textContent;
  openPopUp(profilePopUp, profileForm);
 
});

profileImageWrapper.addEventListener('click', () => {
  openPopUp(profileImagePopUp, profileForm);
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


profileCardsBtn.addEventListener('click', () => openPopUp(profileCardsPopUp, profileForm));

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

  renderLoading(true, cardForm.querySelector('.button')); 

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
      renderLoading(false, cardForm.querySelector('.button'));
    });
});

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







