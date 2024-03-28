import ImageWithData from "../model/imageWithData.js";
/**
 * Return a promise of Images from the link
 * @returns {Promise<ImageWithData[]>}
 */
export default async function fetchImages() {
  const link = "https://picsum.photos/v2/list?limit=10&page=1";
  try {
    const response = await fetch(link);
    const images = await response.json();

    return images.map(
      (image) => new ImageWithData(image.author, image.download_url, image.url)
    );
  } catch (error) {
    console.error("Error: ", error);
  }
}
