/**
 * Images with metadata which are lazy loaded
 */
export default class ImageWithData {
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
    this.element.setAttribute("loading", "lazy");
    this.element.setAttribute("alt", "Image by " + this.author);
    this.element.src = download_url;
  }
}
