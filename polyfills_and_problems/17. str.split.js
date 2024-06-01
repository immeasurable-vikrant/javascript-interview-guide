// Define a function to split a string based on a given delimiter
const split = (string, delimiter) => {
    const res = []; // Initialize an empty array to store the result
    
    // If the delimiter is an empty string, split the string into individual characters
    if (delimiter === '') return Array.from(string);
    
    // Define a recursive function to split the string
    const startSplit = (str, i) => {
        // Base case: If the index (i) is greater than or equal to the 
        // length of the string, exit the function
        if (i >= string.length) return;
        
        // Find the index of the delimiter in the substring of the string starting from index i
        const index = str.indexOf(delimiter);
        
        // If the delimiter is found
        if (index >= 0) {
            // Push the substring from the beginning of the string up to the delimiter to the result array
            res.push(str.substring(0, index));
            // Recursively call startSplit with the substring starting from the position after the delimiter
            // and the new index after the delimiter
            startSplit(str.substring(index + delimiter.length), index + delimiter.length);
        } else {
            // If the delimiter is not found, push the remaining substring to the result array
            res.push(str);
        }
    };
    
    // Call the startSplit function to start splitting the string from index 0
    startSplit(string, 0);
    
    // Return the result array
    return res;
};

// Example usage of the split polyfill
console.log(split('The quick the fox jumps the lazy dog.', 'the'));
// Output: [ 'The quick ', ' fox jumps ', ' lazy dog.' ]
