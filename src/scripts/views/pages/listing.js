import UrlParser from '../../routes/url-parser';

const Listing = {
  async render() {
    return `
        <h1 class="title">Explore Restaurant</h1>
        <data-restaurant></data-restaurant>`;
  },

  async afterRender() {
    const searchButton = document.querySelector('.search-button');

    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const searchInput = document.querySelector('.search-input');

      if (url.resource != null) {
        searchInput.value = '';
        window.location.href = '/#';
        return;
      }

      const dataRestaurant = document.querySelector('data-restaurant');
      dataRestaurant?.setAttribute('filter', searchInput.value);
    });
  },
};

export default Listing;
