const button = document.querySelector('.button');
const dropdown = document.querySelector('.dropdown');

button.addEventListener('click', () => {
  dropdown.classList.toggle('is-open');
});