/* eslint-disable */

import { createRestoCard } from '../../templates/template-creator';

class FavoriteRestoView {
  getTemplate() {
    return `
      <div class="content">
        <h1 class="title">Your Favorite Restaurant</h1> 
        <div class="center w-50">
          <input id="query" type="text" class="search-input" placeholder="Search your favorite resto"/>
        </div>
        <div class="resto-container">
        </div>;
      </div>`;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteResto(resto) {
    let html;
    if (resto.length) {
      html = resto.reduce(
        (carry, movie) => carry.concat(createRestoCard(movie)),
        ''
      );
    } else {
      html = this._getEmptyRestoTemplate();
    }
    document.querySelector('.resto-container').innerHTML = html;
    document
      .querySelector('.resto-container')
      .dispatchEvent(new Event('resto:updated'));
  }

  _getEmptyRestoTemplate() {
    return `
      <div class="resto-item__not__found">
        Tidak ada resto untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestoView;
