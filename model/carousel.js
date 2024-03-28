import CarouselItem from "./carouselItem.js";
import getRandomInt from "./helper.js";
/**
 * Carousel of items
 */
export default class Carousel {
  /**
   * @param {any[]} items array of items
   * @param {HTMLElement} div container of carousel items
   * @param {HTMLElement} display container of display elements
   * @param {HTMLElement} rightArrow element which on click increases current index
   * @param {HTMLElement} leftArrow element which on click decreases current index
   * @param {HTMLElement} authorDiv element containing the image author detials
   */
  constructor(div, displayDiv, leftArrow, rightArrow, authorDiv) {
    this.container = div;
    this.displayContainer = displayDiv;
    this.authorContainer = authorDiv;
    this.items = [];
    this.current = getRandomInt(this.items.length);
    this.#addEventListener(leftArrow, rightArrow);
  }
  /**
   * Returns the currently active Carousel items
   * @returns {CarouselItem}
   */
  get currentItem() {
    return this.items[this.current];
  }
  /**
   * Increases the current Index by 1
   */
  nextItem() {
    this.currentItem.removeActive();

    this.current++;
    this.#loopIndex();

    this.currentItem.addActive();
    this.updateAuthor();
  }
  /**
   * Reduces the current Index by 1
   */
  prevItem() {
    this.currentItem.removeActive();

    this.current--;
    this.#loopIndex();

    this.currentItem.addActive();
    this.updateAuthor();
  }
  /**
   * On carousel item click, sets that items as active
   * @param {Number} id index of item in the array
   */
  onItemClick(index) {
    this.currentItem.removeActive();

    this.current = index;

    this.currentItem.addActive();
    this.updateAuthor();
  }
  /**
   * Adds items to the Carousel
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
   *  Updates author
   */
  updateAuthor() {
    this.authorContainer.setAttribute("href", this.currentItem.item.origin);
    this.authorContainer.innerHTML = this.currentItem.item.author;
  }
  /**
   * Loops the current index to be in bound of theitems array
   */
  #loopIndex() {
    if (this.current >= this.items.length) {
      this.current = 0;
    } else if (this.current < 0) {
      this.current = this.items.length - 1;
    }
  }
  /**
   * Adds onClick and KeyUp event listeners
   * @param {HTMLElement} rightArrow element which on click increases current index
   * @param {HTMLElement} leftArrow element which on click decreases current index
   */
  #addEventListener(leftArrow, rightArrow) {
    document.addEventListener("keyup", (event) => {
      if (event.code === "ArrowLeft") {
        this.prevItem();
      }
      if (event.code === "ArrowRight") {
        this.nextItem();
      }
    });

    if (rightArrow && leftArrow) {
      rightArrow.addEventListener("click", () => this.nextItem());
      leftArrow.addEventListener("click", () => this.prevItem());
    }
  }
}
