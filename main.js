import FetchImages from "./domain/fetchImages.js";
import Carousel from "./model/carousel.js";

const carouselDiv = document.getElementById("carousel");
const imagesDiv = document.getElementById("images");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const authorDiv = document.getElementById("imageAuthor");

const carousel = new Carousel(
  carouselDiv,
  imagesDiv,
  leftArrow,
  rightArrow,
  authorDiv
);

const images = await FetchImages();
carousel.addItems(images);
