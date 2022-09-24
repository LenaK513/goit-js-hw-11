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

  console.log(newsApiService);
}

function onLoadMoreImages() {
  newsApiService.fetchImages().then(onImagesListNotification);
}

function onFilterSearch(data) {
   console.log(data);

  if (data.hits.length) {
     Notiflix.Notify.success(
    `Hooray! We found ${data.totalHits} images.`
  );
    onCreateImageDescription(data);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  console.dir(data);
}

function onImagesListNotification(data) {
  console.log(data);
  const remainImages = Math.ceil(data.totalHits/newsApiService.per_page)
  if (data.length) {
    onCreateImageDescription(data);
  }
  if (remainImages < newsApiService.per_page) {
    Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results'
    );
  }
}

function onCreateImageDescription(data) {
  console.log(data)
  const imageInfo = data.hits
    .map(
      h => `<div class="photo-card">
      <div class="img-thumb">
  <img src="${h.webformatURL}" alt="${h.tags}" loading="lazy" />
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes
      <br>
      ${h.likes}</b>
    </p>
    <p class="info-item">
      <b>Views 
      <br>
      ${h.views}</b>
    </p>
    <p class="info-item">
      <b>Comments
      <br>
      ${h.comments}
      </b>
    </p>
    <p class="info-item">
      <b>Downloads
      <br>
      ${h.downloads}</b>
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
