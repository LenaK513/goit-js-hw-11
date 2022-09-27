import './css/styles.css';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
import NewsApiService from './news-apiservece';

const form = document.querySelector('#search-form');
const tracker = document.querySelector('.tracker');
// const button = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
});

const newsApiService = new NewsApiService();

// button.style.visibility = 'hidden';
console.log(newsApiService);

form.addEventListener('submit', onSearchImages);
// button.addEventListener('click', onLoadMoreImages);

function onSearchImages(event) {
  event.preventDefault();
  onClearGallery();
  newsApiService.resetPage();
  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  newsApiService.fetchImages().then(onFilterSearch);
  event.currentTarget.elements.searchQuery.value = '';

  // button.style.visibility = 'visible';
  console.log(newsApiService);
}

// function onLoadMoreImages() {
//   newsApiService.fetchImages().then(onWarnNotification);
// }

function onFilterSearch(data) {
  console.log(data);

  if (data.totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    onCreateImageDescription(data);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // button.style.visibility = 'hidden';

  console.dir(data);
}

function onWarnNotification(data) {
  newsApiService.incrementPage();
  const pageEnd = Math.ceil(data.hits.length / newsApiService.per_page);
  // console.log(pageEnd);
  if (data.totalHits) {
    onCreateImageDescription(data);
  }
  if (data.hits.length == 0) {
    Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results'
    );

    observer.unobserve(tracker);
  }
}

function onCreateImageDescription(data) {
  console.log(data);
  const imageInfo = data.hits
    .map(
      h => `<div class="photo-card">
     
      <a href=${h.largeImageURL}>
       <div class="img-thumb">
  <img src="${h.webformatURL}" alt="${h.tags}" loading="lazy" />
   </div>
  </a>
 
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

  lightbox.refresh();
}

function onClearGallery() {
  gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.searchQuery !== '') {
      newsApiService.fetchImages().then(onWarnNotification);
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(tracker);
