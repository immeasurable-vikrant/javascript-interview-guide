// Define the custom iterator method for arrays
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