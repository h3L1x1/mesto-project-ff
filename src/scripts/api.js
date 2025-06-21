
export async function addCardToServer(name, link) {
  try {
    const res = await fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
      method: 'POST',
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    });

    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    return await res.json();
    
  } catch (err) {
    console.error('Ошибка добавления карточки:', err);
    throw err;
  }
}

export async function getCurrentUserId() {
  try {
    const res = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
      }
    });
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    const data = await res.json();
    return data._id;
  } catch (err) {
    console.error('Ошибка загрузки пользователя:', err);
    throw err;
  }
}

export async function getProfileData() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Ошибка загрузки профиля:', err);
    throw err;
  }
}

export async function changeProfileData(name, about) {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
        'Content-Type': 'application/json'
      },
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
  const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: img,
    })
  })

  if (!response.ok) {
    throw new Error (`Ошибка: ${response.status}`);
  } return response.json();
};

export async function loadCards() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
      headers: {
        authorization: '87e6130f-0af7-45ae-9714-ffb68bf1a699'
      }
    });
    return await response.json();
  } catch (err) {
    console.error('Ошибка загрузки карточек:', err);
    return [];
  }
};

export function renderLoading(isLoading, button, text = 'Сохранить', loadingText = 'Сохранение...') {
  button.textContent = isLoading ? loadingText : text;
  button.disabled = isLoading;
}






