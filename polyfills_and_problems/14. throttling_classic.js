`Throtlling

Throttling is a technique that limits the execution of a function to once in 
every specified time interval. 
Throttle - function will be invoked once in X interval

``1. Implement a throttling mechanism for a button click handler such that the handler 
function is invoked only once for every specified number of clicks. For instance, 
the function should be called once every four clicks. Write the throttling function 
and demonstrate its usage with a sample click handler that logs "Clicked!" to the console.`;

function throttling(func, count) {
  // Initialize a counter to keep track of clicks
  let counter = 0;

  // Return a new function that will be invoked when the button is clicked
  return function (...args) {
    // Increment the counter each time the returned function is called
    counter++;

    // If the counter hasn't reached the specified count, return early (do nothing)
    if (counter !== count) {
      return;
    }

    // Reset the counter when it reaches the specified count
    counter = 0;

    // Call the original function ('func') with the provided arguments ('args')
    func.apply(this, args);
  };
}

// Define a function 'onClick' that logs "Clicked!"
function onClick() {
  console.log("Clicked!");
}

// Create a new throttled function 'throttleClick' by passing 'onClick' function and throttle count 4
const throttleClick = throttling(onClick, 4); // the function should be invoked once for every four clicks.

`
2. 
    Time based Throttle (classic implementation is the "leading" i.e means when we click it will 
    immediately invoke the function and then the next invocation will happen after the delay). This is a 
    "leading" time-based throttle, where the function executes immediately upon the 
    first call, followed by a delay before allowing the next invocation.
`;
const throttle = (func, delay) => {
  let lastTimerId; //keeps track of the ID of the last set timeout.
  let lastRan; // Keeps track of the timestamp when the function was last invoked

  // Return a new function that will be invoked when triggered
  return function (...args) {
    const context = this;

    // If the function has never been invoked (i.e., first time invocation)
    if (!lastRan) {
      // Invoke the function immediately
      func.apply(context, args);
      // Update the timestamp of the last invocation
      lastRan = Date.now();
    } else {
      // Clear any existing timeout to prevent previously scheduled invocations.
      clearTimeout(lastTimerId);

      // Calculate the remaining time until the next allowed invocation by
      // subtracting the time elapsed since the last invocation from the delay.
      const timeUntilNextInvocation = delay - (Date.now() - lastRan);

      // Set a new timeout
      lastTimerId = setTimeout(() => {
        // Check if the time elapsed since the last invocation is greater than or equal to the specified delay
        if (Date.now() - lastRan >= delay) {
          // Invoke the function
          func.apply(context, args);
          // Update the timestamp of the last invocation
          lastRan = Date.now();
        }
      }, timeUntilNextInvocation);
    }
  };
};

// Example usage
const logMessage = () => {
  console.log("Throttled!");
};

// Create a throttled version of logMessage that only runs once every 2 seconds
const throttledLogMessage = throttle(logMessage, 2000);

// Simulate rapid calls to the throttled function
setInterval(throttledLogMessage, 500); // Should log 'Throttled!' every 2 seconds, not every 500ms
