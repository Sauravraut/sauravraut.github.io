import FetchImages from "./domain/fetchImages.js";
import Carousel from "./model/carousel.js";

const link = "https://picsum.photos/v2/list?limit=10&page=1";

const carouselDiv = document.getElementById("carousel");
const imagesDiv = document.getElementById("images");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const author = document.getElementById("image_author");

const images = await FetchImages(link);

const carousel = new Carousel(
  carouselDiv,
  imagesDiv,
  leftArrow,
  rightArrow,
  author
);

carousel.addItems(images);
