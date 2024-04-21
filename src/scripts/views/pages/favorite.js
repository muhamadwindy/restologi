import FavoriteRestoIdb from '../../data/favorite-resto';
import { createRestoCard } from '../templates/template-creator';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';
import FavoriteRestoShowPresenter from './liked-resto/favorite-resto-show-presenter';
import FavoriteRestoView from './liked-resto/favorite-resto-view';

const view = new FavoriteRestoView();
const Favorite = {
  async render() {
    return view.getTemplate();
  },
  async afterRender() {
    const favResto = await FavoriteRestoIdb.getAll();
    const favRestoContainer = document.querySelector('.resto-container');

    let result = '<div class="resto-container">';

    favResto.forEach((resto) => {
      result += createRestoCard(resto);
    });

    if (favResto && favResto.length === 0) {
      result += 'Oops, Anda Belum Memilih Favorit Restaurant';
    }

    result += '</div>';
    favRestoContainer.innerHTML = result;

    new FavoriteRestoShowPresenter({ view, favoriteResto: FavoriteRestoIdb });
    new FavoriteRestoSearchPresenter({
      view,
      favoriteResto: FavoriteRestoIdb,
    });
  },
};

export default Favorite;
