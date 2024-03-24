import { Carousel, Photo } from "./carousel.js";

const carousel_div = document.getElementById("carousel");
const images_div = document.getElementById("images");
const lArrow = document.getElementById("lArrow");
const rArrow = document.getElementById("rArrow");

const carousel = new Carousel([], carousel_div, images_div);
rArrow.addEventListener("click", () => carousel.nextItem());
lArrow.addEventListener("click", () => carousel.prevItem());

const link = "https://picsum.photos/v2/list?limit=10&page=1";
Fetch(link);

function Fetch(link) {
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((images) => {
      const photos = images.map(
        (image) =>
          new Photo(image.id, image.aurthor, image.download_url, image.url)
      );
      console.log(photos);
      carousel.addItems(photos);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
