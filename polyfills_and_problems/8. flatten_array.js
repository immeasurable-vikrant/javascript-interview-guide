// flat Polyfill

Array.prototype.customFlat = function (depth = Infinity) {
  let flattenedArray = [];

  function flattenArrayHelper(arr, currDepth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currDepth < depth) {
        // Check if the current element is an array
        flattenArrayHelper(arr[i], currDepth + 1); // Recursively call the function on nested arrays
      } else {
        flattenedArray.push(arr[i]); // Add non-array elements to the flattened array
      }
    }
  }

  flattenArrayHelper(this, 0); // Call the helper function with initial depth 0
  return flattenedArray; // Return the flattened array
};

const nestedArray = [1, [2, [3, 4], 5], 6];

// Calling customFlat() on the nested array
const flattenedArray = nestedArray.customFlat(1);

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
