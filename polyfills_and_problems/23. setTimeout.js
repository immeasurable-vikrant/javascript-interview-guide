`
"requestIdleCallback" is a method provided by modern web browsers that allows developers to perform 
background or low-priority tasks during the browser's idle periods. It provides a way to queue 
functions to be called when the browser is idle, giving these functions a chance to run without 
interfering with critical user interactions or animations.

- Scheduling a Task: When you call requestIdleCallback, you pass a callback function that you 
want the browser to execute during an idle period.

- Idle Period Detection: The browser will determine when it has idle time, i.e., when it is 
not actively performing critical tasks like rendering animations, handling user input, or 
other high-priority operations.

- Executing the Callback: Once an idle period is detected, the browser executes the callback 
function you provided.

- Deadline Object: The callback function receives a deadline object as an argument, which
provides information about the current idle period, including a timeRemaining method that 
tells you how much idle time is left. This allows your callback to adjust its behavior 
based on the available time.

`;

function createSetTimeout() {
  // Initialize timerId to 1 to ensure it starts from a unique value
  var timerId = 1;
  // Object to keep track of active timers
  var timerMap = {};

  function setTimeoutPolyfill(callback, delay) {
    // Assign a unique id to the timer
    var id = timerId++;
    // Mark the timer as active in the timerMap
    timerMap[id] = true;
    // Get the current timestamp
    var start = Date.now();

    // Define the triggerCallback function, which will be called by
    // requestIdleCallback or setTimeout
    function triggerCallback() {
      // If the timer has been cleared, exit the function
      if (!timerMap[id]) return;
      // Check if the delay has passed
      if (Date.now() > start + delay) {
        // Execute the callback function
        callback();
        // Remove the timer from the map after execution
        delete timerMap[id];

        // The else block in the triggerCallback function handles cases
        // where the delay hasn't passed yet. It "schedules" another call
        // to triggerCallback either using requestIdleCallback if available
        // or falling back to setTimeout.
      } else {
        // If the delay hasn't passed, "schedule" another call to triggerCallback
        // Use requestIdleCallback if available, otherwise fall back to setTimeout
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(triggerCallback);
        } else {
          // When the delay for the timer hasn't passed yet, it's
          // important to ensure that the callback is executed as soon
          // as the delay expires.
          // By using setTimeout with a short delay, the script attempts
          // to recheck and execute the callback as soon as possible after
          // the delay has elapsed.
          setTimeout(triggerCallback, Math.max(0, start + delay - Date.now()));
          // Math.max(0, start + delay - Date.now()) calculates the remaining time until the 
          // target timestamp.If the target time has already passed, this will result in 0, 
          // meaning the callback should be executed immediately. If the target time is in the future, 
          // this will result in the number of milliseconds left until the target time.
        }
      }
    }

    // Call triggerCallback to start the timer
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(triggerCallback);
    } else {
      setTimeout(triggerCallback, delay);
    }

    // Return the timer id
    return id;
  }

  // Function to clear a timer by removing it from the timerMap
  function clearTimeoutPoly(id) {
    delete timerMap[id];
  }

  // Return the custom setTimeout and clearTimeout functions
  return { setTimeoutPolyfill, clearTimeoutPoly };
}

// Create an instance of custom setTimeout and clearTimeout functions
var { setTimeoutPolyfill, clearTimeoutPoly } = createSetTimeout();
// Log 'start' to the console
console.log("start");

// Set a custom timeout and assign it to myId
setTimeoutPolyfill(function () {
  console.log("I will be called after a delay"); // This will be logged after 1000 milliseconds
}, 3000);

// Clear the timeout before it executes
// clearTimeoutPoly(myId);
// Log 'end' to the console
console.log("end");

`Important:
- In else case:
	By using setTimeout with a short delay, the script allows the browser to 
	continue processing other tasks on the main thread, ensuring a smooth user experience.
- The calculation Math.max(0, start + delay - Date.now()) ensures that the delay passed 
	to setTimeout is always a non-negative value.
``Algorithm:
	Here's a step-by-step explanation of the algorithm:

	1. Function Definition (createSetTimeout):

		- It encapsulates the custom setTimeoutPolyfill and clearTimeoutPoly 
		functions within a closure, ensuring they don't pollute the global scope. 
		This enhances modularity and prevents naming conflicts.

	
	2. Variable Initialization:

		- timerId is initialized to 1 to ensure each timer gets a unique identifier. 
		This prevents conflicts between different timers.
		- timerMap is initialized to an empty object to keep track of active timers. 
		This facilitates easy management and cancellation of timers
		
	
	3. setTimeoutPolyfill Function:

		- It mimics the behavior of the native setTimeout function but provides 
		additional control and reliability, especially in environments lacking 
		certain browser APIs like requestIdleCallback.
		- Generating a unique id ensures that each timer can be individually 
		tracked and managed.
		- Marking the timer as active in timerMap enables easy lookup and 
		cancellation of timers.
		- Recording the start time allows for precise calculation of 
		elapsed time, ensuring accurate timer execution.
	

	4. triggerCallback Function:

		- It's the core logic behind timer execution.
		- Checking if the timer has been cleared prevents executing callbacks 
		for canceled timers, enhancing reliability.
		- Comparing the current time with the scheduled execution time ensures that
		the callback is executed at the correct moment, regardless of system load or delays.
		- Using requestIdleCallback or falling back to setTimeout with a short delay 
		optimizes performance and responsiveness, ensuring the callback is executed efficiently.
	
	5. Starting the Timer:

		Invoking triggerCallback initiates the timer, kicking off the countdown for 
		callback execution.
	
	
	6.Return:

		Returning the id of the timer allows the caller to potentially cancel the timer 
		using clearTimeoutPoly, if needed.
	
	7. clearTimeoutPoly Function:

	- Accepts id as a parameter.
	- Deletes the timer with the corresponding id from the timerMap.
	
	
	Usage Example:

	- Creates an instance of custom setTimeoutPolyfill and clearTimeoutPoly functions.
	- Logs 'start' to the console.
	- Sets a custom timeout to log 'Welcome to jscafe' after 7000 milliseconds.
	- Clears the timeout (commented out in this example).
	- Logs 'end' to the console.
`;
