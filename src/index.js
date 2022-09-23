import './css/styles.css';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

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

function onSearchImages(event) {
  event.preventDefault();
  onClearGallery();
  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchImages().then(onFilterSearch);
  // .catch(onImageError);
}

function onLoadMoreImages() {
  newsApiService.fetchImages().then(onFilterSearch);
}

function onFilterSearch(data) {
  console.log(data);
  if (data.length > 1) {
    onCreateImageDescription(data);
  }
  if (data.totalHits) {
    Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results'
    );
  }
  if (data.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onCreateImageDescription(data) {
  const imageInfo = data
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
