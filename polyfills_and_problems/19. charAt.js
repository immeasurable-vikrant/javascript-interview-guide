// charAt POLYFILL

// Define a polyfill for the charAt method on strings
String.prototype.myCharAt = function(index) {
    // Store the input string in a variable
    const inputStr = this;

    // If the index is null or undefined, set it to 0
    const rightIndex = index !== null ? index : 0;

    // If the index is out of range (less than 0 or greater than the string length), return an empty string
    if (rightIndex < 0 || rightIndex >= this.length) {
        return "";
    }

    // Return the character at the specified index in the input string
    return inputStr[rightIndex];
};

// Example usage of the myCharAt polyfill
console.log("Hello".myCharAt(1)); // Output: "e"
console.log("Hello".myCharAt(10)); // Output: "" (empty string because index is out of range)
