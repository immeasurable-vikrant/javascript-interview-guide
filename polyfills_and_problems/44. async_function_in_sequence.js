`
  The task is to execute multiple asynchronous tasks sequentially and handle their results 
  and errors. Specifically, create an array of asynchronous tasks, execute them one after 
  the other in sequence, and process the results and errors using a callback function. 
  Additionally, ensure that any unhandled promise rejections are properly logged.

  Asynchronous programming allows a program to perform tasks without blocking the main 
  execution flow, enabling tasks to be initiated and completed at different times. 
  In JavaScript, promises are used to handle asynchronous operations, representing a 
  value that may be available now, or in the future, or never.

  concurrency is managed using asynchronous programming with promises, but tasks 
  are executed sequentially.

`;


// Ensure that unhandled rejections are properly logged
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // You can optionally exit the process with a non-zero status
  // process.exit(1);
});

// Function to create an asynchronous task
const createAsyncTask = () => {
  const value = Math.floor(Math.random() * 10);

  // Return a promise that resolves or rejects after a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        // If value is less than 5, reject the promise with an error message
        reject(new Error(`Error: ${value}`));
      } else {
        // If value is 5 or greater, resolve the promise with a success message
        resolve(`Success: ${value * 1000}`);
      }
    }, value * 1000); // Delay in milliseconds based on the random value
  });
};

// Array of asynchronous tasks
const tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

// Function to execute tasks in sequence and process results and errors
const asyncInSequence = async (tasks, callback) => {
  // Array to store results of resolved promises
  const results = [];
  // Array to store errors of rejected promises
  const errors = [];

  // Loop through each task and handle its resolution or rejection sequentially
  for (const task of tasks) {
    try {
      // Await the result of the current task
      const result = await task;
      // If resolved, push the result to the results array
      results.push(result);
    } catch (error) {
      // If rejected, push the error to the errors array
      errors.push(error);
    }
  }

  // Call the callback with the results and errors after all tasks have completed
  callback(errors, results);
};

// Execute tasks sequentially and process results and errors
asyncInSequence(tasks, (errors, results) => {
  console.log("results", results); // Log the array of results
  console.error("errors", errors); // Log the array of errors
});
