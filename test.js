function createAsyncTask() {
  // Generate a random value between 0 and 9
  const value = Math.floor(Math.random() * 10);

  // Return a promise that resolves or rejects after a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        // If value is less than 5, reject the promise with an error message
        reject(`Error: ${value}`);
      } else {
        // If value is 5 or greater, resolve the promise with a success message
        resolve(`value: ${value}`);
      }
    }, value * 1000); // Delay in milliseconds based on the random value
  });
}

// Array of asynchronous tasks
const tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

// Function to execute tasks in parallel and process results and errors
const asyncInParallel = (tasks, callback) => {
  // Array to store results of resolved promises
  const results = [];
  // Array to store errors of rejected promises
  const errors = [];
  // Counter to track completed tasks
  let completed = 0;

  // Loop through each task and handle its resolution or rejection
  tasks.forEach((task) => {
    task
      .then((val) => {
        // If the task resolves, push the result to the results array
        results.push(val);
      })
      .catch((err) => {
        // If the task rejects, push the error to the errors array
        errors.push(err);
      })
      .finally(() => {
        // Increment the completed counter after each task completes
        completed += 1;
        // If all tasks are completed, call the callback with results and errors
        if (completed >= tasks.length) {
          callback(results, errors);
        }
      });
  });
};

// Execute tasks in parallel and process results and errors
asyncInParallel(tasks, (results, errors) => {
  console.log("results", results); // Log the array of results
  console.error("errors", errors); // Log the array of errors
});

