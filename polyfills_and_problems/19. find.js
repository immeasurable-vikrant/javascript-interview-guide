// The Array.prototype.find method, on the other hand, returns the first element in the array that satisfies the provided testing function. 


// Check if the find method is not already defined on the Array prototype

if (!Array.prototype.find) {
  // Define the find method on the Array prototype
  Array.prototype.find = function(callback, thisArg) {
      // Check if 'this' is null or undefined
      if (this == null) {
          // If 'this' is null or undefined, throw a TypeError
          throw new TypeError('Array.prototype.find called on null or undefined');
      }
      // Check if the callback is not a function
      if (typeof callback !== 'function') {
          // If the callback is not a function, throw a TypeError
          throw new TypeError('Callback must be a function');
      }

      // Loop through each element of the array
      for (let i = 0; i < this.length; i++) {
          // Check if the current index exists in the array and if the callback returns true for the current element
          if (i in this && callback.call(thisArg, this[i], i, this)) {
              // If the callback returns true, return the current element
              return this[i];
          }
      }

      // If no matching element is found, return undefined
      return undefined;
  };
}
