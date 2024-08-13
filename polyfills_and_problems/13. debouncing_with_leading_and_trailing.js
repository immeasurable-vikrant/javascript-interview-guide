`In leading debouncing, the function is called immediately on the first call, 
and then it waits for the specified delay period before it can be called again.

- If the leading option is true, the function will be invoked immediately upon the event.
- If the trailing option is true, the function will be invoked after the delay following the last event.
- If both leading and trailing options are true, the function will be invoked twice:
  - Once immediately when the event occurs,
  - And once after the delay following the last event.
- If both leading and trailing options are false, the function will not be invoked.
`;

//debounce function takes three parameters:
// func: The function to be debounced
// delay: The delay (in milliseconds) before the function is invoked
// option: An optional object specifying debounce options, defaults to { leading: false, trailing: true }
const debounce = (func, delay, option = { leading: false, trailing: true }) => {
  let timeout; // Reference to the setTimeout timer
  // Returns a debounced version of the original function
  return function (...args) {
    const context = this; // Preserve the context (this) of the debounced function

    // Clear the existing timeout if any to reset the debounce timer
    if (timeout) {
      clearTimeout(timeout);
    }

    // Determine if the function should be called immediately
    const shouldCallImmediately = option.leading && !timeout;

    // If the leading option is true and there is no active timeout, call the function immediately
    if (shouldCallImmediately) {
      func.apply(context, args); // Invoke the function with the current context and arguments
    }

    // Set a new timeout to invoke the function after the specified delay
    timeout = setTimeout(() => {
      // If trailing option is true and the function wasn't called immediately (leading)
      if (option.trailing && !shouldCallImmediately) {
        func.apply(context, args); // Invoke the function with the current context and arguments
      }
      // Reset the timeout to allow future leading calls if needed
      timeout = null;
    }, delay);
  };
};

`
Trailing Edge Debouncing:

- In trailing edge debouncing, the function is executed after a specified delay has passed since the 
last occurrence of the event.
- If the event occurs multiple times within the delay period, the function execution is postponed 
until the delay period elapses without any new event occurrences.
- Trailing edge debouncing is commonly used when you want the function to be executed after the 
user has stopped performing the action or when you want to handle the final state of the event.

Leading Edge Debouncing:

- In leading edge debouncing, the function is executed immediately when the event occurs 
for the first time.
- Subsequent occurrences of the event within the delay period are ignored until the delay period 
elapses without any new event occurrences.
- Leading edge debouncing is useful when you want to handle the initial state of the event immediately, 
but you want to ignore rapid subsequent triggers until the event has settled.`;
