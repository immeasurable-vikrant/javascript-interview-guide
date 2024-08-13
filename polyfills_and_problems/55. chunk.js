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
      chunk.push(arr[i + j]);
    }

    // Add the chunk to the result array.
    result.push(chunk);
  }

  return result;
}

// Test cases
console.log(chunk([1, 2, 3, 4, 5], 1)); // [[1], [2], [3], [4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 3)); // [[1, 2, 3], [4, 5]]
console.log(chunk([1, 2, 3, 4, 5], 4)); // [[1, 2, 3, 4], [5]]
console.log(chunk([1, 2, 3, 4, 5], 5)); // [[1, 2, 3, 4, 5]]
