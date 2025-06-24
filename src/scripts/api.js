
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export async function loadProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
};

export async function addCardToServer(name, link) {
  try {
    const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,

      body: JSON.stringify({ name, link })
    });

    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    return await res.json();
    
  } catch (err) {
    console.error('Ошибка добавления карточки:', err);
    throw err;
  }
}

export async function changeProfileData(name, about) {
  try {
    const response = await fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,

      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Ошибка обновления профиля:', err);
    throw err;
  }
}

export async function changeAvatarData(img) {
  const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,

    body: JSON.stringify({
      avatar: img,
    })
  })

  if (!response.ok) {
    throw new Error (`Ошибка: ${response.status}`);
  } return response.json();
};

export  async function loadCards()   {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
  return checkResponse(res);
};

export async function deleteOwnerCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
      })
      .then(res => {
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    return res.json();
  });
}

export async function loadLikeCounter(cardId, like) {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: like ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then(checkResponse);
}





