// Implemnet mapLimit Asked in Uber's Interview

`
Problem Statement:
  Implement a "mapLimit" function in JavaScript that works similarly to Array.prototype.map, 
  but processes elements of an array in 'batches' with a specified limit on the number of 
  concurrent asynchronous operations. This function should return a promise that resolves 
  with an array of results or rejects if any operation fails. Each asynchronous operation 
  is performed by a provided iteratee function, which accepts an element and a callback. 
  The callback should be called with an error flag as the first argument and the result 
  as the second argument when the operation completes.

  Explanation and Concept
    The mapLimit function helps manage and control the number of concurrent asynchronous 
    operations, which can be beneficial in scenarios where resources are limited, or making 
    too many concurrent requests can overwhelm a system.

  Key concepts:

  - Batch Processing: The input array is divided into smaller sub-arrays (batches) of a specified size.
  - Series Execution: Batches are processed one after the other.
  - Parallel Execution within Batch: Elements within each batch are processed concurrently.
  
  Steps to Implement mapLimit
    - Chop the Array: Divide the input array into sub-arrays (batches) of the specified size.
    - Series Execution of Batches: Use "reduce" to process each batch "sequentially", accumulating results.
    - Parallel Execution within Batch: Use Promise to handle the parallel execution of asynchronous 
      operations within each batch.


`;

// Helper function to chop an array into chunks of a given size
const chop = (arr, size) => {
  if (arr.length === 0 || size <= 0) {
    return [];
  }
  let chopped = [];
  for (let i = 0; i < arr.length; i += size) {
    let chunked = [];
    for (let j = 0; j < size && i + j < arr.length; j++) {
      chunked.push(arr[i + j]);
    }
    chopped.push(chunked);
  }
  return chopped;
};

// mapLimit function
const mapLimit = (arr, limit, fn) => {
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Chop the input array into subarrays of the specified limit
    let chopped = chop(arr, limit);

    // Process each subarray sequentially
    const final = chopped.reduce((promiseChain, batch) => {
      // Chain the promises to process batches in series
      return promiseChain.then((accumulatedResults) => {
        // Process the current batch in parallel
        return new Promise((batchResolve, batchReject) => {
          const results = [];
          let tasksCompleted = 0;

          // Process each element in the batch
          batch.forEach((element) => {
            fn(element, (error, result) => {
              if (error) {
                // Reject if any error occurs
                batchReject(error);
              } else {
                // Collect the result
                results.push(result);
                tasksCompleted++;

                // Resolve the batch when all tasks are complete
                if (tasksCompleted >= batch.length) {
                  batchResolve([...accumulatedResults, ...results]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));

    // Resolve or reject the final promise based on the final state
    final.then((result) => resolve(result)).catch((error) => reject(error));
  });
};

// Example use case
let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(() => {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
