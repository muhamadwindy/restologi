import restaurantDataSource from './data/restaurant-datasource';
import { createRestoCard } from './views/templates/template-creator';

class dataRestaurant extends HTMLElement {
  constructor() {
    super();
    this.filter = this.getAttribute('filter');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.filter = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['filter'];
  }

  async render() {
    if (this.filter) {
      this.resto = await restaurantDataSource.getBy(this.filter);
    } else {
      this.resto = await restaurantDataSource.getAll();
    }
    let result = '<div class="resto-container">';
    this.resto.forEach((resto) => {
      result += createRestoCard(resto);
    });
    if (this.resto && this.resto.length === 0) {
      result = 'Oopss! Data yang anda cari tidak ada';
    }
    result += '</div>';
    this.innerHTML = result;
  }
}
customElements.define('data-restaurant', dataRestaurant);
