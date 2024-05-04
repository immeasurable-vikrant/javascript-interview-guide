function createSetTimeout() {
	// Initialize timerId to 1 to ensure it starts from a unique value
	var timerId = 1;
	var timerMap = {}; // Object to keep track of active timers

	function setTimeoutPolyfill(callback, delay) {
		// Assign a unique id to the timer
		var id = timerId++;
		timerMap[id] = true; // Mark the timer as active in the timerMap
		var start = Date.now(); // Get the current timestamp
		// console.log(requestIdleCallback(() => console.log("hello")))
		// Define the triggerCallback function, which will be called by requestIdleCallback
		function triggerCallback() {
			// If the timer has been cleared, exit the function
			if (!timerMap[id]) return;
			// Check if the delay has passed
			if (Date.now() > start + delay) {
				// Execute the callback function
				callback();
			} else {
				// If the delay hasn't passed, schedule another call to triggerCallback using requestIdleCallback
				requestIdleCallback(triggerCallback);
			}
		}
		// Call triggerCallback to start the timer
		requestIdleCallback(triggerCallback);
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
// // Log 'start' to the console
// console.log('start');

// // Set a custom timeout and assign it to myId
// var myId = setTimeoutPolyfill(function () {
// 	console.log('Welcome to jscafe'); // This will be logged after 1000 milliseconds
// }, 1000);

// // Clear the timeout before it executes
// clearTimeoutPoly(myId);
// // Log 'end' to the console
// console.log('end');


module.exports = { createSetTimeout };

// Algorithm:
// Algorithm to create a custom setTimeout function using requestIdleCallback

// 1. Initialize a unique timer identifier and a timer map to keep track of active timers.
// 2. Define a function, createSetTimeout, to encapsulate the custom setTimeout logic.

// 3. Inside createSetTimeout:
//    a. Initialize timerId to 1 to ensure it starts from a unique value.
//    b. Initialize timerMap as an empty object to keep track of active timers.

// 4. Define setTimeoutPolyfill function:
//    a. Increment timerId to assign a unique id to the timer.
//    b. Mark the timer as active in the timerMap.
//    c. Record the start time using Date.now().
//    d. Define triggerCallback function:
//       - Check if the timer has been cleared. If so, exit the function.
//       - Check if the delay has passed. If yes, execute the callback.
//       - If the delay hasn't passed, schedule another call to triggerCallback using requestIdleCallback.
//    e. Call triggerCallback to start the timer and return the timer id.

// 5. Define clearTimeoutPoly function:
//    a. Remove the timer from the timerMap.

// 6. Return custom setTimeout and clearTimeout functions as an object.

// 7. Create an instance of custom setTimeout and clearTimeout functions using createSetTimeout.

// Example usage:
// - Set a custom timeout with setTimeoutPolyfill.
// - Clear the timeout with clearTimeoutPoly.
