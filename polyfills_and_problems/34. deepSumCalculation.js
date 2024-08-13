// Calculate the sum of all numeric values in a nested JavaScript object

// Define a function to calculate the sum of all numeric values in a nested object
const deepSumCalculations = (obj) => {
    let sum = 0; // Initialize sum to 0
    for (let key in obj) { // Iterate through each key in the object
        if (typeof obj[key] === 'number') { // If the value is a number
            sum += obj[key]; // Add it to the sum
        } else if (typeof obj[key] === 'object') { // If the value is an object (nested object)
            sum += deepSumCalculations(obj[key]); // Recursively call the function to sum nested object values
        }
    }
    return sum; // Return the total sum
}

// Define the nested JavaScript object
let data = {
    d: 10,
    a: {
        a: 'a',
        b: 1,
    },
    b: {
        b: 1,
    },
    c: {
        c: {
            e: 'e',
            b: {
                c: 'c',
                a: 1
            }
        }
    }
}
console.log(deepSumCalculations(data)); // Call the function and log the result to the console
