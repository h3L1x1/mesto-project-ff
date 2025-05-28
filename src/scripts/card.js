 export function createCard(cardData, deleteCard, imageClickHandler, likeClickHandler)  {
  const cardTemplate  = document.querySelector('#card-template');
  const templateElement = cardTemplate.content.cloneNode(true);
  const cardTitle = templateElement.querySelector('.card__title');
  const cardImage = templateElement.querySelector('.card__image');      
  const deleteBtn = templateElement.querySelector('.card__delete-button');
  const likeBtn = templateElement.querySelector('.card__like-button')
  const cardElement = templateElement.querySelector('.card');

  cardImage.src = cardData.link;  
  cardImage.alt = cardData.name;  
  cardTitle.textContent = cardData.name; 

  deleteBtn.addEventListener('click', () => { 
    deleteCard(cardElement);
});
  cardImage.addEventListener('click', () => {
  imageClickHandler(cardImage);
});

 likeBtn.addEventListener('click', () => {
    likeClickHandler(likeBtn); 
  });

  return cardElement;
}

export  function deleteCard(cardElement) {
  cardElement.remove(); 
}

export function likeClickHandler(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
