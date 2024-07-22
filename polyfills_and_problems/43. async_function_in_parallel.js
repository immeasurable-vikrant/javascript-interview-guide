`The objective is to execute multiple asynchronous tasks in parallel and process their 
results and errors once all tasks have completed. Specifically, the task is to create an 
array of asynchronous tasks, execute them in parallel, and handle the results and errors of 
these tasks using a callback function.

- Parallel Execution
    Executing tasks in parallel means starting them all at the same time and handling 
    their results as they complete. This is often used to improve performance by utilizing 
    concurrency.

    Concurrency refers to the ability of a system to handle multiple tasks at the same time. 
    It does not necessarily mean that tasks are executed simultaneously, but rather that progress 
    is made on multiple tasks over the same period of time. This is particularly useful in 
    environments where tasks are I/O bound (e.g., waiting for data from a disk, network, etc.), 
    allowing the CPU to switch between tasks and make progress on each.

    Key Concepts of Concurrency:

    - Multithreading: Running multiple threads within a process, where each thread can handle a 
        separate task. Threads share the same memory space. This can lead to issues such as race 
        conditions and deadlocks, requiring synchronization mechanisms like locks or 
        semaphores to ensure thread-safe operations.
    - Asynchronous Programming: Tasks are started and allowed to run in the background while 
        the main program continues to execute. Once the background task is complete, 
        it notifies the main program. This approach improves the responsiveness of applications, 
        especially those involving I/O operations, by not blocking the main execution 
        flow while waiting for the task to complete.
    - Parallelism: A type of concurrency where tasks are actually executed simultaneously, 
        often on multiple CPU cores. This leverages multi-core processors to perform multiple 
        computations at the same time, significantly speeding up tasks that can be divided 
        into independent subtasks.
`;

// Function to create an asynchronous task
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
