`The task is to implement a function promiseMerge that takes multiple promises as 
arguments. When all promises resolve, it should merge their results into a single 
value based on their types. If any promise rejects or if there are type mismatches, 
the function should reject with an appropriate error message.

`;
// Helper function to check if a value is a plain object (not an array or other type of object)
function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

// Helper function to determine the type of a value
function findType(value) {
  if (Array.isArray(value)) {
    return "array";
  } else if (isPlainObject(value)) {
    return "object";
  } else {
    const type = typeof value;
    return ["number", "string", "boolean"].includes(type) ? type : "invalid";
  }
}

// Function to merge multiple promises and handle their results
function promiseMerge(...promises) {
  return new Promise((resolve, reject) => {
    // If no promises are passed, reject with a TypeError
    if (promises.length === 0) {
      return reject(new TypeError("invalid arguments"));
    }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then((results) => {
        // Determine the type of the first resolved value
        let response = null;
        const type = findType(results[0]);

        // Check if all resolved values are of the same type
        for (let i = 1; i < results.length; i++) {
          const currentItemType = findType(results[i]);
          if (currentItemType !== type) {
            return reject(new TypeError("invalid types"));
          }
        }

        // Merge the results based on their type
        if (type === "number" || type === "string") {
          // Sum numbers or concatenate strings
          response = results.reduce(
            (acc, current) => acc + current,
            type === "string" ? "" : 0
          );
        } else if (type === "array") {
          // Concatenate arrays
          response = [].concat(...results);
        } else if (type === "object") {
          // Merge objects
          response = Object.assign({}, ...results);
        } else if (type === "boolean") {
          // Logical AND for booleans
          response = results.reduce((acc, current) => acc && current, true);
        } else {
          // Reject if the type is invalid
          return reject(new TypeError("invalid type"));
        }

        // Resolve the promise with the merged result
        return resolve(response);
      })
      // Catch and reject if any of the promises reject
      .catch(reject);
  });
}

// Example usage

// Merge promises resolving to numbers
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

promiseMerge(p1, p2, p3)
  .then((result) => console.log(result)) // Output: 6
  .catch((error) => console.error(error));

// Merge promises resolving to strings
const p4 = Promise.resolve("Hello");
const p5 = Promise.resolve(" ");
const p6 = Promise.resolve("World");

promiseMerge(p4, p5, p6)
  .then((result) => console.log(result)) // Output: "Hello World"
  .catch((error) => console.error(error));
