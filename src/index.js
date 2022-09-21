import './css/styles.css';
import axios from 'axios';

import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = document.querySelector('#input');
const button = document.querySelector('.load-more');

form.addEventListener('submit', onSearchImages);
button.addEventListener('click', onLoadMoreImages);
function onSearchImages(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value;

  fetch(
    `https://pixabay.com/api/?key=30064107-c73b2a0aceced325114b9b159&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  ).then(response => response.json());
  // .then(console.log);
}
