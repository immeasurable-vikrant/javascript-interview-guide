// 1. Browser has superpowers that are lent to JS engine to execute some tasks, these superpowers include web API's such as console, location, DOM API, setTimeout, fetch, local storage.
// 2. Callback functions and event handers are first stored in Web API environment and then transferred to callback queue.
// 3. Promises and mutation observer are stored in API environment and then transferred to microtask queue.
// 4. Event loop continuously observes call stack and when it is empty it transfers task to call stack.
// 5. Micro task is given priority over callback tasks.
// 6. Too many micro tasks generated can cause Starvation (nit giving time to callback tasks to execute).

// In JavaScript, the event loop, microtask queue, callback queue, and call stack are all key components that help manage the asynchronous nature of the language.

// Call Stack:

// The call stack is a data structure that keeps track of the function calls in your code. It follows the Last In, First Out (LIFO) principle, meaning the last function that gets pushed onto the stack is the first one to be popped off when the function completes.

// Callback Queue (Task Queue):
// The callback queue, also known as the task queue, holds tasks (callbacks or events) that are ready to be executed. These tasks usually come from asynchronous operations, such as DOM events, HTTP requests, or timers.

// Event Loop:
// The event loop is responsible for continuously checking the call stack and the callback queue. If the call stack is empty, the event loop takes the first task from the callback queue and pushes it onto the call stack for execution.

// Microtask Queue:
// The microtask queue holds tasks that are also ready to be executed but has a higher priority than the callback queue. Microtasks are usually scheduled by JavaScript promises, mutation observers, and other similar mechanisms.

// Here's how they work together:
// When an asynchronous operation is encountered, such as a setTimeout or a Promise, the callback associated with that operation is sent to the callback queue after the specified time or when the Promise settles.

// When the call stack is empty (no functions being executed), the event loop takes the first task from the microtask queue and pushes it onto the call stack.

// If the microtask queue is empty, the event loop looks at the callback queue and pushes the first task onto the call stack.

// This process repeats, allowing JavaScript to handle asynchronous operations without blocking the main thread.

// Understanding these concepts is crucial for writing efficient and responsive asynchronous JavaScript code, as it helps you manage the order of execution and prevent blocking the user interface.



// 1. JS runtime environment contains all elements required to run JS.
// 2. It contains JS engine, set of API's, callback queue, microtask queue, event loop.
// 3. JS engine is a piece of code not a machine. 
// 4. Process includes Parsing ---> Compilation -----> Execution.
// 5. Parsing breaks code into tokens and converts it into AST(Abstract Syntax Tree).
// 6. Modern JS engine follows JIT compilation, it interprets while it optimises code as much as it can.
// 7. Execution and Compilation are done together.
// 8. Execution has Garbage collector and other optimisation such as inlining, copy elusion, inline caching etc.