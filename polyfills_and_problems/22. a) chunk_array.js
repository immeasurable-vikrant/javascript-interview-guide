`Implement _.chunk() --> Lodash

_.chunk() splits array into groups with the specific size.

Please implement your chunk(arr: any[], size: number)

chunk([1,2,3,4,5], 1)
// [[1], [2], [3], [4], [5]]

chunk([1,2,3,4,5], 2)
// [[1, 2], [3, 4], [5]]

chunk([1,2,3,4,5], 3)
// [[1, 2, 3], [4, 5]]

chunk([1,2,3,4,5], 4)
// [[1, 2, 3, 4], [5]]

chunk([1,2,3,4,5], 5)
// [[1, 2, 3, 4, 5]]
for size smaller than 1, return an empty array.
`;


function chunk(arr, size) {
  // If the array is empty or size is less than or equal to 0, return an empty array.
  if (arr.length === 0 || size <= 0) {
    return [];
  }

  // Initialize an empty array to hold the chunks.
  let result = [];

  // Iterate over the array in increments of the chunk size.
  for (let i = 0; i < arr.length; i += size) {
    // Create a sub-array for the current chunk.
    let chunk = [];

    // Populate the chunk array with the appropriate elements.
    for (let j = 0; j < size && i + j < arr.length; j++) {
      // console.log("j", j)
      // console.log("i + j", i + j)
      chunk.push(arr[j]);
    }

    // Add the chunk to the result array.
    result.push(chunk);
  }

  return result;
}

// Test cases
// console.log(chunk([1, 2, 3, 4, 5], 1)); // [[1], [2], [3], [4], [5]]
// console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 3)); // [[1, 2, 3], [4, 5]]
console.log(chunk([1, 2, 3, 4, 5], 4)); // [[1, 2, 3, 4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 5)); // [[1, 2, 3, 4, 5]]



