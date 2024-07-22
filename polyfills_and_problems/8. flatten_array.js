// flat Polyfill

Array.prototype.customFlat = function(depth = Infinity) {
  let flattenedArray = [];

  function flattenArrayHelper(arr, currDepth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currDepth < depth) {
        flattenArrayHelper(arr[i], currDepth + 1);
      } else {
        flattenedArray.push(arr[i]);
      }
    }
  }

  // Call the helper function with the initial depth set to 0
  flattenArrayHelper(this, 0);
  return flattenedArray;
}

const nestedArray = [1, [2, [3, 4], 5], 6];

// Calling customFlat() on the nested array
const flattenedArray = nestedArray.customFlat(0);

console.log(flattenedArray); // Output: [1, [2, [3, 4], 5], 6]
