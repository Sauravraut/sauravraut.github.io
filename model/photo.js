/**
 * Photo class containg image and the metadata about the image
 */
export default class Photo {
  /**
   * @param {String} author author of the image
   * @param {String} url download url of the image
   * @param {String} origin origin url of the image
   */
  constructor(author, download_url, origin) {
    this.author = author;
    this.url = download_url;
    this.origin = origin;

    this.element = new Image();
    this.element.src = download_url;
    this.element.setAttribute("loading", "lazy");
  }
}
