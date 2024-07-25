`
Create a rate-limiting function in JavaScript that restricts how often a given 
function can be called. This function should ensure that no more than a specified 
number of calls are made within a certain time interval. If the call limit is reached, 
additional calls should be queued and executed later when the interval resets.

- Rate Limiting: 
    Rate limiting is a technique used to control the rate at which a particular 
    action is performed. In this context, it restricts how frequently a function 
    can be called to prevent overloading a system or API.

`;

function rateLimit(func, limit, interval) {
  // Initialize the number of calls made within the current interval
  let calls = 0;

  // Queue to hold calls that exceed the rate limit
  let queue = [];

  // Function to reset the call count and process queued calls
  const resetCalls = () => {
    // Reset the call counter to 0
    calls = 0;

    // Process the queued calls if there are any
    // This loop continues until either the queue is empty or the limit is reached again
    while (queue.length > 0 && calls < limit) {
      // Dequeue the first call in the queue
      const { resolve, reject, args } = queue.shift();
      try {
        // Execute the function and resolve the promise
        resolve(func(...args));
        // Increment the call counter
        calls++;
      } catch (error) {
        // Reject the promise if the function throws an error
        reject(error);
      }
    }

    // If there are still queued calls, schedule another reset
    // This ensures that queued calls are eventually processed
    if (queue.length > 0) {
      setTimeout(resetCalls, interval);
    }
  };

  // Schedule the initial call to resetCalls to ensure periodic reset of the call counter
  setTimeout(resetCalls, interval);

  // Return the rate-limited version of the function
  return function (...args) {
    return new Promise((resolve, reject) => {
      // check whether the number of function calls made within the current interval is less than the specified limit.
      if (calls < limit) {
        try {
          // If the call limit is not reached, execute the function immediately
          resolve(func(...args));
          // Increment the call counter
          calls++;
        } catch (error) {
          // Reject the promise if the function throws an error
          reject(error);
        }
      } else {
        // If the call limit is reached, add the call to the queue
        queue.push({ resolve, reject, args });
      }
    });
  };
}

// Example usage:
const limitedFunction = rateLimit(console.log, 2, 1000);

// Test the rate-limited function
limitedFunction("Call 1"); // This will execute immediately
limitedFunction("Call 2"); // This will execute immediately
limitedFunction("Call 3"); // This will be added to the queue and executed later
limitedFunction("Call 4"); // This will be added to the queue and executed later
