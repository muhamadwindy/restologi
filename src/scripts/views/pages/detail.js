import restaurantDataSource from '../../data/restaurant-datasource';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createDetailPages } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
        <h1 class="title">Detail Restaurant</h1>
        <div class="resto-detail"></div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await restaurantDataSource.get(url.id);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.id,
        name: resto.name,
        description: resto.description,
        pictureId: resto.pictureId,
        city: resto.city,
        rating: resto.rating,
      },
    });

    createDetailPages(resto);

    const formReview = document.querySelector('#form-review');
    formReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      const result = await restaurantDataSource.review({
        id: resto.id,
        name: formReview.elements.name.value,
        review: formReview.elements.review.value,
      });

      if (result.message === 'success') {
        resto.customerReviews = result.customerReviews;
        createDetailPages(resto);
      }
      alert(result.message);
    });
  },
};

export default Detail;
