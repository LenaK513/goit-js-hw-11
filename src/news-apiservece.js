export default class NewsApiService {
  constructor() {}

  fetchImages(searchQuery) {
    const url = `https://pixabay.com/api/?&q=${searchQuery}`;

    const options = {
      key: '30064107-c73b2a0aceced325114b9b159',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: '1',
      per_page: '40',
    };
    fetch(url, options)
      .then(response => response.json())
      .then(console.log);
  }
}
