import data from "../public/data/DATA.json";
class dataRestaurant extends HTMLElement {
  constructor() {
    super();
    this.filter = this.getAttribute("filter");
  }
  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(`Attribute: ${name} changed!`);
    this.filter = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ["filter"];
  }

  render() {
    const resto = this.filter
      ? data.restaurants.filter((item) =>
          item.city.toLowerCase().includes(this.filter.toLowerCase())
        )
      : data.restaurants;

    let result = `<div class="resto-container">`;
    result += resto
      .map((item) => {
        const starPercentage = (item.rating / 5) * 100;
        const starPercentageRounded = `${
          Math.round(starPercentage / 10) * 10
        }%`;

        return `<div class="card" key="${item.id}">
        <div class="card-header">
          <img
            src="${item.pictureId}"
            alt="${item.name || ""}" />
        </div>
        <div class="card-body">
          <div class="card-tag">${item.city}</div> 
          <a href="#" class="card-name">${item.name}</a>
          <div class="card-description">${item.description}</div>    
          
          <div class="stars-outer">
            <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
            </div>${" " + item.rating}<div>
          </div> 
          <button>Read more</button>
        </div>     
      </div>`;
      })
      .join("");

    result += resto.length === 0 ? "Oopss! Data yang anda cari tidak ada" : "";
    result += `</div>`;
    this.innerHTML = result;
  }
}

customElements.define("data-restaurant", dataRestaurant);
