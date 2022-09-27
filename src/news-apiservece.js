import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    try {
      const response =
        await axios.get(`https://pixabay.com/api/?key=30064107-c73b2a0aceced325114b9b159&q=${this.searchQuery}&
    image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`);

      const data = response.data;
      this.incrementPage();
      return data;
      // return fetch(url)
      //   .then(response => response.json())
      //   .then(data => {
      //     this.page += 1;

      //     return data.hits;
      //   });
    } catch (error) {
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
