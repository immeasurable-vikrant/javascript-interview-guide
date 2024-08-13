
//CONCAT POLYFILL

// Define a function to push values from one array (dest) to another array (src)
const pushValuesHelper = (src, dest) => {
  // Iterate over each item in the dest array
  for (let item of dest) {
      // Push the item to the src array
      src.push(item);
  }
  // Return the modified src array
  return src;
};

// Define a polyfill for the concat method on arrays
Array.prototype.myConcat = function(...args) {
  // Create a copy of the current array (this) to store the concatenated result
  let result = [...this];
  
  // Iterate over each argument passed to myConcat
  for (let item of args) {
      // If the argument is an array
      if (Array.isArray(item)) {
          // Concatenate the arrays using the pushValues function and assign the result back to result
          result = pushValuesHelper(result, item);
      } else {
          // If the argument is not an array, push it directly to the result array
          result.push(item);
      }
  }
  
  // Return the concatenated result
  return result;
};

// Example usage of myConcat
console.log("concat", [1, 2, 3].myConcat([4, 5, 6, 7, 8], 9, 10));
