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

    fetch('https://nomoreparties.co/v1/wff-cohort-41/cards/cardId', {

      method: 'DELETE',
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
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
