// Asked in Google Interview
`Create a function retry that retries a given promise-based function a specified 
number of times if it fails, and handles success and failure scenarios appropriately.`;

// This function returns another function that simulates a promise-based API call.
// It keeps track of the number of times it has been called using a closure variable 'count'.
const testPromise = () => {
  let count = 0;
  return () => {
    return new Promise((resolve, reject) => {
      count += 1;
      if (count <= 5) {
        // If called 5 or fewer times, it rejects the promise to simulate a failed API call.
        reject("I am Failed API");
      } else {
        // If called more than 5 times, it resolves the promise to simulate a successful API
        //   call.
        resolve("I am Successful!");
      }
    });
  };
};

// This function retries a promise-based function until it succeeds or the retry limit is
//   reached.

// Parameters:
// - func: The function to retry. This function must return a promise.
// - retries: The maximum number of retry attempts.
// - finalError: The error message to use if all retry attempts fail.
const promiseRetry = (func, retries, finalError) => {
  return new Promise((resolve, reject) => {
    // Inner function to handle the retry attempts recursively.
    const attempt = (n) => {
      func() // Call the promise-based function.
        .then(resolve) // If it resolves, the main promise resolves.
        .catch((err) => {
          // If it rejects,
          if (n === 1) {
            // If no retries left, reject the main promise with the final error message.
            reject(finalError);
          } else {
            // Otherwise, try again with one fewer retry remaining.
            attempt(n - 1);
          }
        });
    };
    // Start the first attempt with the initial number of retries.
    attempt(retries);
  });
};

// Create a function using testPromise. This function will simulate the API call.
const testFunc = testPromise();

// Call promiseRetry with the test function, specifying 5 retries and a final error
//   message.
promiseRetry(testFunc, 5, "I am a failure!")
  .then((val) => {
    // If the promise eventually resolves, log the success message.
    console.log("resolved: ", val);
  })
  .catch((err) => {
    // If all retry attempts fail, log the final error message.
    console.log("rejected: ", err);
  });
