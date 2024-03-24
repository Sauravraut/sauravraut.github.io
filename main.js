import Carousel from "./model/carousel.js";
import Photo from "./model/photo.js";

const carousel_div = document.getElementById("carousel");
const images_div = document.getElementById("images");
const lArrow = document.getElementById("lArrow");
const rArrow = document.getElementById("rArrow");

const carousel = new Carousel([], carousel_div, images_div);

rArrow.addEventListener("click", () => carousel.nextItem());
lArrow.addEventListener("click", () => carousel.prevItem());

const link = "https://picsum.photos/v2/list?limit=10&page=1";

try {
  const response = await fetch(link);
  const images = await response.json();

  const photos = images.map(
    (image) => new Photo(image.author, image.download_url, image.url)
  );

  carousel.addItems(photos);
} catch (error) {
  console.error("Error: ", error);
}
