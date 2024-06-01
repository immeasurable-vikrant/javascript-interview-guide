`Debouncing is a technique used to ensure that a function is not called 
too frequently. It helps to limit the rate at which a function can fire. 
This is particularly useful in scenarios like handling user input events, 
window resizing, and other events that can trigger many times in a short 
period. There are three main types of debouncing: classic (trailing), 
leading, and combined (leading and trailing).

Classic (Trailing) Debouncing:
In classic debouncing, the function is called after a specified delay time 
has passed since the last time the debounced function was invoked. This means 
the function will execute after the event has "settled."

`

// Debounce function implementation (trailing)
const debounce = (func, delay) => {
    // Initialize a variable to store the timer
    let timer;
    // Return a new function that will be debounced
    return function (...args) {
        // Store the context of 'this' from the returned function
        const context = this;
        // Clear any existing timer to reset the delay period
        clearTimeout(timer);
        // Set a new timer with the specified delay
        timer = setTimeout(() => {
            // Call the function with the correct context and arguments after the delay
            func.apply(context, args);
        }, delay);
    };
};

// Example usage

// Function to be debounced
const logMessage = (message) => {
    console.log(message);
};

// Create a debounced version of the logMessage function with a delay of 2 seconds
const debouncedLogMessage = debounce(logMessage, 2000);

// Simulate rapid function calls
debouncedLogMessage("Hello, World!"); // Only this call should log "Hello, World!" after 2 seconds
debouncedLogMessage("This will be ignored");
debouncedLogMessage("So will this");
debouncedLogMessage("And this");

// After 2 seconds, only "And this" will be logged to the console
