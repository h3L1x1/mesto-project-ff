function showError(inputElement, errorMessage, config) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  if (!errorElement) {
    console.error(`Элемент ошибки для ${inputElement.id} не найден`);
    return;
  }
  
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  errorElement.style.display = 'block';
}

function hideError(inputElement, config) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  if (!errorElement) return;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  errorElement.style.display = 'none';
}

function checkInputValidity(inputElement, config) {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, config);
    return false;
  }
  
  if (inputElement.type === 'text' && config.validationRegex) {
    if (!config.validationRegex.test(inputElement.value)) {
      showError(inputElement, config.validationMessages.regexMismatch, config);
      return false;
    }
  }
  
  hideError(inputElement, config);
  return true;
}

function hasInvalidInput(inputList, config) {  // Добавлен параметр config
  return inputList.some(inputElement => {
    const isStandardValid = inputElement.validity.valid;
    
    if (inputElement.type === 'text' && config.validationRegex) {
      return !config.validationRegex.test(inputElement.value) || !isStandardValid;
    }
    
    return !isStandardValid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {  // Добавлен параметр config
  if (hasInvalidInput(inputList, config)) {  // Передаем config
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
    
    inputElement.addEventListener('blur', () => {
      checkInputValidity(inputElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, config);
  });
}

function clearValidation(formElement, config) {
  if (!formElement) return;

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => hideError(inputElement, config));
  toggleButtonState(inputList, buttonElement, config);
}

export { enableValidation, clearValidation };