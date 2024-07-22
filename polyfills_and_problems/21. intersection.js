// Function to find intersection of two arrays using strict equality
function intersection(arr1, arr2) {
    // Check if both parameters are arrays
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error('Both parameters should be arrays');
    }

    // Convert arr1 to a Set for faster lookup
    let set = new Set(arr1);

    // Filter arr2 to include only elements present in arr1
    let res = arr2.filter((elem) => set.has(elem));

    // Return the resulting array
    return res;
}

// Example usage of intersection function
console.log(intersection([1, 2, 3, 4, 5], [3, 4, 5])); // Output: [3, 4, 5]




// Function to find intersection of two arrays using a custom comparator function
function intersectionWith(arr1, arr2, comparator) {
    // Check if both parameters are arrays
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error('Both parameters should be arrays');
    }

    // Check if comparator is a function
    if (typeof comparator !== 'function') {
        throw new Error('Comparator must be a function');
    }

    // Filter arr1 to include only elements that satisfy the comparator condition with any element in arr2
    return arr1.filter((elem1) => arr2.some((elem2) => comparator(elem1, elem2)));
}

// Example usage of intersectionWith function
const ar1 = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' },
];
const ar2 = [
    { id: 2, name: 'Jane' },
    { id: 4, name: 'Bob' },
];

const intersection_with = intersectionWith(
    ar1,
    ar2,
    (item1, item2) => item1.id === item2.id // Custom comparator function
);
console.log(intersection_with); // Output: [ { id: 2, name: 'Jane' } ]
