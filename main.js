import Carousel from "./model/carousel.js";
import ImageWithData from "./model/imageWithData.js";

const carouselDiv = document.getElementById("carousel");
const imagesDiv = document.getElementById("images");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

const carousel = new Carousel(carouselDiv, imagesDiv);

// add click event to arrow images
rightArrow.addEventListener("click", () => carousel.nextItem());
leftArrow.addEventListener("click", () => carousel.prevItem());

// update varialbe and calss to be literal name
// update arrow div changing size
// alt text

const link = "https://picsum.photos/v2/list?limit=10&page=1";

try {
  const response = await fetch(link);
  const images = await response.json();

  const ImagesWithData = images.map(
    (image) => new ImageWithData(image.author, image.download_url, image.url)
  );

  carousel.addItems(ImagesWithData);
} catch (error) {
  console.error("Error: ", error);
}
