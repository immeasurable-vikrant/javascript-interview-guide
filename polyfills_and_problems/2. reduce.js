// The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

// The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).


// Define a custom method 'enhancedReduce' on the Array prototype
Array.prototype.customReduce = function(reducerCallback, initialValue) {
    // Initialize the accumulator variable with the provided initialValue
    let accumulatedValue = initialValue;
    
    // Loop through each element of the array
    for (let index = 0; index < this.length; index++) {
        // Extract the current element from the array
        const currentValue = this[index];

        // Check if the accumulator value exists
        if (accumulatedValue !== undefined) {
            // If the accumulator value exists, call the provided reducer callback function with the following parameters:
            //  - accumulator: the current accumulated value
            //  - currentValue: the current element of the array
            //  - index: the index of the current element
            //  - array: the original array being iterated
            accumulatedValue = reducerCallback(accumulatedValue, currentValue, index, this);
        } else {
            // If the accumulator value is undefined (i.e., this is the first iteration), set the accumulator to the currentValue
            accumulatedValue = currentValue;
        }
    }

    // Return the final accumulated value after all iterations
    return accumulatedValue;
}



let arr = [1, 2, 3, 4, 5];

let arr_reduce= arr.reduce((acc, currValue) => acc + currValue, 10)
console.log(arr_reduce)

let arr_customReduce = arr.customReduce((acc, currValue) => acc + currValue, 10)
console.log(arr_customReduce)


