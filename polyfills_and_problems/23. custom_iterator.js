// Define the custom iterator method for arrays

//USING - Self
Array.prototype.customIterator = function customIterator() {
  let index = 0;
  const self = this; // Store a reference to the array

  function next() {
    if (index < self.length) {
      return { value: self[index++], done: false };
    } else {
      return { done: true };
    }
  }

  return { next };
};

//USING - function variable - The issue in your code is related to the context of this inside 
// the next function. In JavaScript, when you define a function inside another function, 
// it creates a new lexical scope. In your case, the next function is defined inside the 
// customIterator function. Therefore, when you reference this inside next, it does not 
// refer to the array arr1.To fix this issue, you can use an arrow function for the next function, 
// as arrow functions do not bind their own this value. Instead, they inherit this from the 
// surrounding lexical context, which in this case would be the customIterator function, where 
// this refers to the array.

Array.prototype.customIterator = function () {
  let index = 0;

  // Define the next function for the iterator
  const next = () => {
    if (index < this.length) {
      return { value: this[index++], done: false }; // Return the next element and update the index
    } else {
      return { done: true }; // Indicate that the iterator has finished
    }
  };

  // Return the iterator object
  return {
    next: next, // Provide access to the next function
  };
};

// Example usage of custom iterator
const myArray = [1, 2, 3, 4, 5];

// Get the custom iterator for myArray
const customIterator = myArray.customIterator();

// Manually call the next function of the iterator and output the value
// console.log("manual", customIterator.next().value); // Output: 1
// console.log("manual", customIterator.next().value); // Output: 2
// console.log("manual", customIterator.next().value); // Output: 3
// console.log("manual", customIterator.next().value); // Output: 4
// console.log("manual", customIterator.next().value); // Output: 5

let result = customIterator.next();
while (!result.done) {
  console.log("while", result.value); // Output the current value
  result = customIterator.next(); // Move to the next element
}
