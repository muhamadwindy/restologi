import FavoriteRestoIdb from '../data/favorite-resto';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this.likeButtonContainer = likeButtonContainer;
    this.resto = resto;
    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.resto;

    if (await this.isExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isExist(id) {
    const resto = await FavoriteRestoIdb.get(id);
    return !!resto;
  },

  renderLike() {
    this.likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.put(this.resto);
      this.renderButton();
    });
  },

  renderLiked() {
    this.likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.delete(this.resto.id);
      this.renderButton();
    });
  },
};

export default LikeButtonInitiator;
