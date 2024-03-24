/**
 * Carousel of items
 */
export default class Carousel {
  /**
   * @param {any[]} items array of items
   * @param {HTMLElement} div container of carousel items
   * @param {HTMLElement} display container of display elements
   */
  constructor(div, displayDiv) {
    this.container = div;
    this.displayContainer = displayDiv;
    this.items = [];
    this.current = getRandomInt(this.items.length);

    // add keypress event
    document.addEventListener("keyup", (event) => {
      if (event.code === "ArrowLeft") {
        carousel.prevItem();
      }
      if (event.code === "ArrowRight") {
        carousel.nextItem();
      }
    });
  }
  /**
   * Returns the currently active Carousel items
   */
  get currentItem() {
    return this.items[this.current];
  }
  /**
   * increases the current Index by 1
   */
  nextItem() {
    this.currentItem.removeActive();

    this.current++;
    this.#loopIndex();

    this.currentItem.addActive();
  }
  /**
   * reduces the current Index by 1
   */
  prevItem() {
    this.currentItem.removeActive();

    this.current--;
    this.#loopIndex();

    this.currentItem.addActive();
  }
  /**
   * on carousel item click, sets that items as active
   * @param {Number} id index of item in the array
   */
  onItemClick(index) {
    this.currentItem.removeActive();

    this.current = index;

    this.currentItem.addActive();
  }
  /**
   * adds items to the Carousel
   * @param {any[]} items array of items to be added
   */
  addItems(items) {
    for (const item of items) {
      const newCarouselItem = new CarouselItem(
        this.items.length,
        item,
        this.container,
        this.displayContainer
      );
      newCarouselItem.div.addEventListener("click", () =>
        this.onItemClick(newCarouselItem.id)
      );
      this.items.push(newCarouselItem);
    }

    this.onItemClick(getRandomInt(this.items.length));
  }
  /**
   * Loops the current index to be in bound of items array
   */
  #loopIndex() {
    if (this.current >= this.items.length) {
      this.current = 0;
    } else if (this.current < 0) {
      this.current = this.items.length - 1;
    }
  }
}

/**
 * Individual items in the Carousel
 */
class CarouselItem {
  /**
   * @param {Number} index index of item in the carousel
   * @param {any} item item iteself
   * @param {HTMLElement} parentDiv container of carousel items
   * @param {HTMLElement} displayDiv container of display elements
   */
  constructor(index, item, parentDiv, displayDiv) {
    this.id = index;
    this.item = item;
    this.div = document.createElement("div");

    parentDiv.appendChild(this.div);
    displayDiv.appendChild(this.item.element);
  }

  /**
   * removes active class from the carousel item
   */
  removeActive() {
    this.item.element.classList.remove("active");
    this.div.classList.remove("active");
  }

  /**
   * adds active class to the carousel item
   */
  addActive() {
    this.item.element.classList.add("active");
    this.div.classList.add("active");
  }
}

/**
 * Returns an integer between 0 and not including max
 * @param {Number} max Maximum number ( not inclusive )
 * @returns {Number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
