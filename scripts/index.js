// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate  = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(cardData, deleteCard) {
  const templateElement = cardTemplate.content.cloneNode(true);
  const cardTitle = templateElement.querySelector('.card__title');
  const cardImage = templateElement.querySelector('.card__image');      
  const deleteBtn = templateElement.querySelector('.card__delete-button');
  const cardElement = templateElement.querySelector('.card');

  cardImage.src = cardData.link;  
  cardImage.alt = cardData.name;  
  cardTitle.textContent = cardData.name; 

  deleteBtn.addEventListener('click', function() { 
    deleteCard(cardElement);
});

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove(); 
}


initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.appendChild(cardElement);
});


