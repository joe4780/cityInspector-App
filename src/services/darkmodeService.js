export function setDarkMode(isDarkMode) {
  document.body.classList.toggle('dark-mode', isDarkMode);
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

export function initializeDarkMode() {
  const savedTheme = localStorage.getItem('theme');
  const isDarkMode = savedTheme === 'dark';
  setDarkMode(isDarkMode);
  return isDarkMode;
}
