import ImageWithData from "../model/imageWithData.js";

export default async function FetchImages(link) {
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
