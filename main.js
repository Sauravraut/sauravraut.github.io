const link = "https://picsum.photos/v2/list?limit=10&page=1";
let photos = [];
let carousel_items = [];
let current_image_index = 0;
const author = document.getElementById("image_author");
const carousel = document.getElementById("carousel");
const images = document.getElementById("images");

start();

// TODO: compare lazy loading vs non lazy loading

/**
 * fetches the photos and selects a random one to display
 */
function start() {
  fetch(link)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      generateImages(data);
      current_image_index = getRandomInt(data.length);
      addActive();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * generates images and associated item
 */
function generateImages(data) {
  for (let i = 0; i < data.length; i++) {
    // create image
    const img = new Image();
    img.setAttribute("loading", "lazy");
    img.author = data[i].author;
    img.origin = data[i].url;
    img.src = data[i].download_url;

    // create carousel item
    const item = document.createElement("div");
    item.setAttribute("id", i);
    item.addEventListener("click", onCarouselItemClick);

    // add to refrence for later
    carousel_items.push(item);
    photos.push(img);

    // add to dom
    images.appendChild(img);
    carousel.appendChild(item);
  }
}

/**
 * updates Author
 */
function updateAuthor() {
  author.innerHTML = "Author : " + photos[current_image_index].author;
  author.setAttribute("href", photos[current_image_index].origin);
}

/**
 * changes the image to a new index based on the adder
 */
function nextImage(adder) {
  removeActive();

  current_image_index += parseInt(adder);

  if (current_image_index >= photos.length) {
    current_image_index = 0;
  } else if (current_image_index < 0) {
    current_image_index = photos.length - 1;
  }

  addActive();
}

/**
 * changes active carousel item
 */
function onCarouselItemClick() {
  removeActive();

  current_image_index = this.id;

  addActive();
}

/**
 * removes active class from current
 */
function removeActive() {
  photos[current_image_index].classList.remove("active");
  carousel_items[current_image_index].classList.remove("active");
}

/**
 * adds active class to current
 */
function addActive() {
  photos[current_image_index].classList.add("active");
  carousel_items[current_image_index].classList.add("active");

  updateAuthor();
}

/**
 * Return an integer between 0 and not including max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
