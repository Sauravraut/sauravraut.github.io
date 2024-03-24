export class Carousel {
  constructor(items, div, display) {
    this.div = div;
    this.display = display;
    this.items = items.map(
      (item, index) => new CarouselItem(index, item, this.div, this.display)
    );
    this.current = 0;
  }

  get currentItem() {
    return this.items[this.current];
  }

  nextItem() {
    this.currentItem.removeActive();

    this.current++;
    this.#loopItems();

    this.currentItem.addActive();
  }

  prevItem() {
    this.currentItem.removeActive();

    this.current--;
    this.#loopItems();

    this.currentItem.addActive();
  }

  onItemClick(id) {
    this.currentItem.removeActive();

    this.current = id;
    this.currentItem.addActive();
  }

  addItems(items) {
    for (const item of items) {
      const newItem = new CarouselItem(
        this.items.length,
        item,
        this.div,
        this.display
      );
      newItem.div.addEventListener("click", () => this.onItemClick(newItem.id));
      this.items.push(newItem);
    }

    this.onItemClick(0);
  }

  #loopItems() {
    if (this.current >= this.items.length) {
      this.current = 0;
    } else if (this.current < 0) {
      this.current = this.items.length - 1;
    }
  }
}

class CarouselItem {
  constructor(index, item, parent_div, display) {
    this.id = index;
    this.item = item;
    this.div = document.createElement("div");

    parent_div.appendChild(this.div);
    display.appendChild(this.item.ele);
  }

  removeActive() {
    this.item.ele.classList.remove("active");
    this.div.classList.remove("active");
  }
  addActive() {
    this.item.ele.classList.add("active");
    this.div.classList.add("active");
  }
}

export class Photo {
  constructor(id, aurthor, download_url, url) {
    this.aurthor = aurthor;
    this.url = download_url;
    this.origin = url;
    this.ele = new Image();
    this.ele.src = download_url;
    this.ele.setAttribute("loading", "lazy");
  }
}
