import { ownerDeleteCard, loadLikeCounter } from "./api";

export function createCard(cardData, deleteCard, imageClickHandler, likeClickHandler, currentUserId) {
  const cardTemplate = document.querySelector('#card-template');
  const templateElement = cardTemplate.content.cloneNode(true);
  const cardTitle = templateElement.querySelector('.card__title');
  const cardImage = templateElement.querySelector('.card__image');
  const deleteBtn = templateElement.querySelector('.card__delete-button');
  const likeBtn = templateElement.querySelector('.card__like-button');
  const cardElement = templateElement.querySelector('.card');

  if (!cardTitle || !cardImage || !deleteBtn || !likeBtn || !cardElement) {
    console.error('Не найдены необходимые элементы в шаблоне карточки');
    return null;
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  
  const likeCounter = templateElement.querySelector('.like__counter');
  if (likeCounter) {
    likeCounter.textContent = cardData.likes?.length || 0;
  }

  const isLikedByCurrentUser = cardData.likes?.some(like => like._id === currentUserId);
  if (isLikedByCurrentUser) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  const isOwner = (cardData.owner && cardData.owner._id === currentUserId) || (cardData.userId === currentUserId) || (!cardData.owner && currentUserId);
  deleteBtn.style.display = isOwner ? 'block' : 'none';

  if (isOwner) {
  deleteBtn.addEventListener('click', () => {
    ownerDeleteCard(cardData._id)
      .then(() => {
        deleteCard(cardElement); 
      })
      .catch(err => {
        console.error('Ошибка удаления карточки:', err);
      });
  });
}

  cardImage.addEventListener('click', () => imageClickHandler(cardData));
  likeBtn.addEventListener('click', () => likeClickHandler(likeBtn, cardData));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();  
}

export function likeClickHandler(likeButton, cardData) {
  const cardElement = likeButton.closest('.card');
  const likeCounter = cardElement.querySelector('.like__counter');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  likeCounter.textContent = isLiked 
    ? parseInt(likeCounter.textContent) - 1 
    : parseInt(likeCounter.textContent) + 1;


  loadLikeCounter(cardData._id, isLiked)
  
  .then(res => {
    if (!res.ok) {
      
      likeCounter.textContent = isLiked 
        ? parseInt(likeCounter.textContent) + 1 
        : parseInt(likeCounter.textContent) - 1;
      throw new Error('Ошибка при обновлении лайка');
    }
    return res.json();
  })
  .then(updatedCard => {
    
    cardData.likes = updatedCard.likes;
   
    likeCounter.textContent = updatedCard.likes.length;
    likeButton.classList.toggle('card__like-button_is-active');
  })
  .catch(err => console.error(err));
}