import './css/styles.css';
import axios from 'axios';

import Notiflix from 'notiflix';
import NewsApiService from './news-apiservece';

const form = document.querySelector('#search-form');
const input = document.querySelector('#input');
const button = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const newsApiService = new NewsApiService();

console.log(newsApiService);

form.addEventListener('submit', onSearchImages);
button.addEventListener('click', onLoadMoreImages);

// let searchQuery = '';

function onSearchImages(event) {
  event.preventDefault();
  onClearGallery();
  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService
    .fetchImages()
    .then(onCreateImageDescription)
    .catch(onImageError);
}

function onLoadMoreImages() {
  newsApiService
    .fetchImages()
    .then(onCreateImageDescription)
    .catch(onImageError);
}

function onCreateImageDescription(hits) {
  const imageInfo = hits
    .map(
      h => `<div class="photo-card">
  <img src="${h.webformatURL}" alt="${h.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${h.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${h.views}</b>
    </p>
    <p class="info-item">
      <b>Comments${h.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${h.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imageInfo);
}

function onClearGallery() {
  gallery.innerHTML = '';
}

function onImageError(error) {
  if ((hits.length = [])) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
