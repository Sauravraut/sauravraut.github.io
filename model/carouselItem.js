/**
 * Individual items in the Carousel
 */
export default class CarouselItem {
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
