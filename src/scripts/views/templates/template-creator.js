const randomColor = () => {
  const result = Math.floor(Math.random() * 16777215).toString(16);
  return `#${result}`;
};

const generateCategories = (paramResto) => {
  let result = '';
  paramResto.categories.forEach((cat) => {
    result += `<span class="categories" style="border-color:${randomColor()}">${
      cat.name
    }</span>`;
  });

  return result;
};

const generateReviews = (paramResto) => {
  let result = '';
  paramResto.customerReviews.forEach((review) => {
    result += '<div class="card-customer-review">';
    result += `
      <div class="name">${review.name}</div>
      <div class="date">${review.date}</div>
      <div class="review">${review.review}</div>
      `;
    result += '</div>';
  });

  return result;
};

const generateMenuMakanan = (paramResto) => {
  let result = '';
  result = `    
    <div class="menu-makanan">
      <h2>Makanan</h2> 
      <ul>`;
  paramResto.menus.foods.forEach((food, index) => {
    result += `<li><span>${index + 1}</span> ${food.name}</li>`;
  });
  result += '</ul></div>';

  return result;
};

const generateMenuMinuman = (paramResto) => {
  let result = '';
  result = `    
    <div class="menu-makanan">
      <h2>Minuman</h2> 
      <ul>`;
  paramResto.menus.drinks.forEach((drink, index) => {
    result += `<li><span>${index + 1}</span> ${drink.name}</li>`;
  });
  result += '</ul></div>';

  return result;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
const createDetailPages = (resto) => {
  const restoDetailContainer = document.querySelector('.resto-detail');
  const starPercentage = (resto.rating / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  const htmlCategories = generateCategories(resto);

  const htmlCustomerReview = generateReviews(resto);

  const htmlMenuMakanan = generateMenuMakanan(resto);

  const htmlMenuMinuman = generateMenuMinuman(resto);

  restoDetailContainer.innerHTML = `  
      <div class="container"> 
        <div class="image-container">
          <img src=
          "https://restaurant-api.dicoding.dev/images/medium/${resto.pictureId}"
            alt="${resto.name}"> 
          <div class="city">${resto.city}</div>
        </div>
        <div class="data-resto">
          <div class="name">${resto.name}</div>
          <div class="stars-outer">
            <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
            </div>${` ${resto.rating}`}<div>
          </div> 
          <div class="address">${resto.address}</div>
          <div class="description">${resto.description}</div>
          ${htmlCategories}
        </div>
        <div class="customer-review">
          <h3>Review This Restaurant</h3>
          <hr />
          <form id="form-review">
            <div>
              <label for="name">Name</label>
              <input type="text" name="name"></input>
            </div>
            <div>
              <label for="review">Review</label>
              <textarea name="review" rows="4"></textarea>
            </div>
            <div>
              <button type="submit">Send</button>
            </div>
          </form> 
          <h3>Review Customer</h3>
          <hr />
          ${htmlCustomerReview}
        </div>
        <div class="menu-container">
        <h3>Menu</h3>
        <hr />
          <div class="box">
          ${htmlMenuMakanan}
          ${htmlMenuMinuman}
          </div>     
        </div>     
      </div>

    `;
};

const createRestoCard = (resto) => {
  const starPercentage = (resto.rating / 5) * 100;
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  return `<div class="card resto-item" key="${resto.id}">
        <div class="card-header">
          <img class="lazyload"
            data-src=
            "https://restaurant-api.dicoding.dev/images/small/${
  resto.pictureId
}"
            alt="${resto.name || ''}" />
        </div>
        <div class="card-body">
          <div class="card-tag">${resto.city}</div> 
          <a href="/#/detail/${resto.id}" class="card-name resto-name">${
  resto.name || '-'
}</a>
          <div class="card-description">${resto.description}</div>    
          
          <div class="stars-outer">
            <div class="stars-inner" style="width: ${starPercentageRounded}"></div>
            </div>${` ${resto.rating}`}<div>
          </div>  
          <a href="/#/detail/${resto.id}">Detail</a>
        </div>     
      </div>`;
};
export {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createDetailPages,
  createRestoCard,
};
