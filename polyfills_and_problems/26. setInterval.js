// Function to create polyfills for setTimeout and clearTimeout
function createSetTimeout() {
  let timerId = 1; // Unique timer identifier
  let timerMap = {}; // Map to store active timers

  // Polyfill for setTimeout
  function setTimeoutPoly(callback, delay) {
    let id = timerId++; // Generate a new unique timer id
    timerMap[id] = true; // Mark this timer as active
    let start = Date.now(); // Record the start time

    // Function to trigger the callback after the specified delay
    function triggerCallback() {
      if (!timerMap[id]) return; // If the timer was cleared, exit

      // Check if the delay has passed
      if (Date.now() >= start + delay) {
        callback(); // Execute the callback
      } else {
        // If delay has not passed, check again using requestIdleCallback or setTimeout
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(triggerCallback); // Use requestIdleCallback if available
        } else {
          setTimeout(triggerCallback, Math.max(0, start + delay - Date.now())); // Fallback to setTimeout
        }
      }
    }

    // Schedule the initial triggerCallback call
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(triggerCallback);
    } else {
      setTimeout(triggerCallback, Math.max(0, start + delay - Date.now()));
    }

    return id; // Return the timer id
  }

  // Polyfill for clearTimeout
  function clearTimeoutPoly(id) {
    delete timerMap[id]; // Remove the timer from the active timers map
  }

  return { setTimeoutPoly, clearTimeoutPoly }; // Return the polyfill functions
}

const { setTimeoutPoly, clearTimeoutPoly } = createSetTimeout(); // Create the polyfills

// Function to create polyfills for setInterval and clearInterval
function createInterval() {
  let timerId = 1; // Unique interval identifier
  let timerMap = {}; // Map to store active intervals

  const { setTimeoutPoly, clearTimeoutPoly } = createSetTimeout(); // Use the setTimeout polyfill

  // Polyfill for setInterval
  function setIntervalPoly(callback, delay) {
    let id = timerId++; // Generate a new unique interval id

    // Function to repeatedly execute the callback
    function reiterate() {
      timerMap[id] = setTimeoutPoly(() => {
        callback(); // Execute the callback
        if (timerMap[id]) {
          // If the interval is still active
          reiterate(); // Schedule the next callback execution
        }
      }, delay);
    }

    reiterate(); // Start the interval
    return id; // Return the interval id
  }

  // Polyfill for clearInterval
  function clearIntervalPoly(id) {
    clearTimeoutPoly(timerMap[id]); // Clear the associated timeout
    delete timerMap[id]; // Remove the interval from the active intervals map
  }

  return { setIntervalPoly, clearIntervalPoly }; // Return the polyfill functions
}

console.log("Starting");

// Function to demonstrate the usage of the setIntervalPoly and clearIntervalPoly polyfills
function run() {
  const { setIntervalPoly, clearIntervalPoly } = createInterval(); // Create the interval polyfills
  let count = 1; // Initialize a counter
  let timer = setIntervalPoly(() => {
    count += 1; // Increment the counter
    console.log(count); // Log the current count
    if (count === 10) {
      // Check if the count has reached 10
      console.log("counted");
      clearIntervalPoly(timer); // Clear the interval
    }
  }, 100); // Execute the callback every 100 milliseconds
}

run(); // Start the interval

console.log("Ending");
