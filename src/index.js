import './css/styles.css';
import axios from 'axios';

import Notiflix from 'notiflix';
import NewsApiService from './news-apiservece';

const form = document.querySelector('#search-form');
const input = document.querySelector('#input');
const button = document.querySelector('.load-more');

const newsApiService = new NewsApiService();

console.log(newsApiService);

form.addEventListener('submit', onSearchImages);
button.addEventListener('click', onLoadMoreImages);

let searchQuery = '';

function onSearchImages(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value;

  // const url = `https://pixabay.com/api/?key=30064107-c73b2a0aceced325114b9b159&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;

  // fetch(url)
  //   .then(response => response.json())
  //   .then(console.log);
  newsApiService.fetchImages(searchQuery);
}

function onLoadMoreImages() {
  // const url = `https://pixabay.com/api/?key=30064107-c73b2a0aceced325114b9b159&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(console.log);
  newsApiService.fetchImages(searchQuery);
}
