import FetchImages from "./domain/fetch.js";
import Carousel from "./model/carousel.js";

const carouselDiv = document.getElementById("carousel");
const imagesDiv = document.getElementById("images");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const carousel = new Carousel(carouselDiv, imagesDiv);

// add click event to arrows
rightArrow.addEventListener("click", () => carousel.nextItem());
leftArrow.addEventListener("click", () => carousel.prevItem());

const link = "https://picsum.photos/v2/list?limit=10&page=1";

const images = await FetchImages(link);

carousel.addItems(images);
