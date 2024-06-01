// Check if the findIndex method is not already defined on the Array prototype
if (!Array.prototype.findIndex) {
  // Define the findIndex method on the Array prototype
  Array.prototype.findIndex = function (callback, thisArg) {
    // Check if 'this' is null or undefined
    if (this == null) {
      // If 'this' is null or undefined, throw a TypeError
      throw new TypeError(
        "Array.prototype.findIndex called on null or undefined"
      );
    }
    // Check if the callback is not a function
    if (typeof callback !== "function") {
      // If the callback is not a function, throw a TypeError
      throw new TypeError("Callback must be a function");
    }
    // Loop through each element of the array
    for (let i = 0; i < this.length; i++) {
      // Check if the callback returns true for the current element
      if (callback.call(thisArg, this[i], i, this)) {
        // If the callback returns true, return the index of the current element
        return i;
      }
    }

    // If no matching element is found, return -1
    return -1;
  };
}

const numbers = [1, 3, 7, 8, 10];
const firstEvenIndex = numbers.findIndex((num) => num % 2 === 0);
console.log(firstEvenIndex); // Output: 3 (index of the first even number, 8
