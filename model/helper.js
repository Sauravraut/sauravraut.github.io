/**
 * Returns an integer between 0 and not including max
 * @param {Number} max Maximum number ( not inclusive )
 * @returns {Number}
 */
export default function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
