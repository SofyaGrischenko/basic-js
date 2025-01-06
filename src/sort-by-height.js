const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  const indices = [];
  const heights = arr.filter((value, index) => {
    if (value === -1) {
      indices.push(index);
      return false;
    }
    return true;
  });

  heights.sort((a, b) => a - b);

  indices.forEach((index) => {
    heights.splice(index, 0, -1);
  });

  return heights;
}

module.exports = {
  sortByHeight,
};
