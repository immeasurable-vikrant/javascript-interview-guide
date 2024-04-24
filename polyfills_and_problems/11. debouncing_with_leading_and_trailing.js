
// If the leading option is true, the function will be invoked immediately upon the event.
// If the trailing option is true, the function will be invoked after the delay following the last event.
// If both leading and trailing options are true, the function will be invoked twice:
//   - Once immediately when the event occurs,
//   - And once after the delay following the last event.
// If both leading and trailing options are false, the function will not be invoked.



//debounce function takes three parameters:
// func: The function to be debounced
// delay: The delay (in milliseconds) before the function is invoked
// option: An optional object specifying debounce options, defaults to { leading: false, trailing: true }
const debounce = (func, delay, option = { leading: false, trailing: true }) => {
    let isLeadingInvoked = false; // Flag to track whether the function call is for leading or trailing
    let timeout; // Reference to the setTimeout timer

    // Returns a debounced version of the original function
    return (...args) => {
        const context = this; // Preserve the context of the debounced function

        // If a timeout is already set, clear it to restart the debounce process
        if (timeout) {
            clearTimeout(timeout);
        }

        // Leading condition: If leading option is true and no timeout is set
        if (option.leading && !timeout) {
            // Immediately invoke the function
            func.apply(context, args);
            isLeadingInvoked = true; // Set flag indicating leading invocation
        } else {
            isLeadingInvoked = false; // Reset the flag if not leading invocation
        }

        // Set a new timeout to invoke the function after the delay
        timeout = setTimeout(() => {
            // Trailing condition: If trailing option is true and not leading invocation
            if (option.trailing && !isLeadingInvoked) {
                // Invoke the function after the delay
                func.apply(context, args);
            }

            timeout = null; // Reset the timeout for precaution
        }, delay);
    };
};






// Trailing Edge Debouncing:
// In trailing edge debouncing, the function is executed after a specified delay has passed since the last occurrence of the event.
// If the event occurs multiple times within the delay period, the function execution is postponed until the delay period elapses without any new event occurrences.
// Trailing edge debouncing is commonly used when you want the function to be executed after the user has stopped performing the action or when you want to handle the final state of the event.




// Trailing Edge Debouncing:

// In trailing edge debouncing, the function is executed after a specified delay has passed since the last occurrence of the event.
// If the event occurs multiple times within the delay period, the function execution is postponed until the delay period elapses without any new event occurrences.
// Trailing edge debouncing is commonly used when you want the function to be executed after the user has stopped performing the action or when you want to handle the final state of the event.

// Leading Edge Debouncing:

// In leading edge debouncing, the function is executed immediately when the event occurs for the first time.
// Subsequent occurrences of the event within the delay period are ignored until the delay period elapses without any new event occurrences.
// Leading edge debouncing is useful when you want to handle the initial state of the event immediately, but you want to ignore rapid subsequent triggers until the event has settled.