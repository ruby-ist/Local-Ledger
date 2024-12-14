export function clearErrorMessage(e: Event) {
  const element = e.target as HTMLInputElement;
  element.setCustomValidity('');
};

export function removeFocus(e: KeyboardEvent) {
  (e.target as HTMLInputElement).blur();
};

export function setErrorMessage(e: Event) {
  const element = e.target as HTMLInputElement;
  const errorMessage = element.dataset.errorMessage as string;
  element.setCustomValidity(errorMessage);
};
