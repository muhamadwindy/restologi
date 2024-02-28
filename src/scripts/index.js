import "regenerator-runtime"; /* for async await transpile */
// import "../styles/main.css";
import "../styles/main.scss";
import "../scripts/data-restaurant.js";
const dataRestaurant = document.createElement("data-restaurant");
const restoSection = document.querySelector("#resto-section");
restoSection.appendChild(dataRestaurant);

const sideMenu = document.querySelector("#side-menu");
const ulMenu = document.querySelector("#ul-menu");
ulMenu.style["top"] = "65px";

document.querySelector("html").focus();
sideMenu.addEventListener("change", () => {
  if (sideMenu.checked) {
    // ulMenu.style["top"] = "60px";
    ulMenu.style["left"] = "0px";
    ulMenu.style["zIndex"] = "1";
  } else {
    // ulMenu.style["top"] = "-490px";
    ulMenu.style["left"] = "-700px";
    ulMenu.style["zIndex"] = "-1";
  }
});

const restoContainer = document.querySelector(".resto-container");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
dataRestaurant.setAttribute("filter", searchInput.value || "");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  dataRestaurant.setAttribute("filter", searchInput.value);
  restoContainer.focus();
});
