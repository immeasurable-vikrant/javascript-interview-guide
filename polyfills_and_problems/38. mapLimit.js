// `
// The mapLimit function aims to process a list of inputs using an asynchronous function 
// (iterateeFn) with a constraint on the number of concurrent operations. This is useful in 
// scenarios where we want to limit the number of simultaneous async operations to avoid 
// overwhelming resources or to comply with rate limits (e.g., API request limits).
// `

// `
// Concept Explanation:

// Concurrency: The function limits the number of concurrent operations, ensuring that at most 
//     limit async operations are running simultaneously.

// Asynchronous Iteration: The function processes each input through an async function and 
//     collects the results.

// Batched Processing: Inputs are processed in batches, where each batch contains a maximum 
//     of limit inputs. This ensures controlled execution without exceeding the concurrency limit.
// `

// Implement mapLimit, which is a utility function that produces a list of outputs by mapping each input through an asynchronous iteratee function. The provided limit dictates how many operations can occur at once.

// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

// https://learnersbucket.com/examples/interview/implement-maplimit-async-function/


function getNameById(id, callback) {
    // Simulating an async request with a random delay between 200 and 299 milliseconds
    const randomRequestTime = Math.floor(Math.random() * 100) + 200;
    
    setTimeout(() => {
      // Calling the callback with the result after the delay
      callback("User" + id);
    }, randomRequestTime);
  }
  
  const chop = (input, limit) => {
    // Function to split the input array into chunks of size 'limit'
    let i = 0;
    let results = [];
    while (i < input.length) {
      // Creating chunks of the input array
      results.push(input.slice(i, i + limit));
      i = i + limit;
    }
    return results;
  };
  
  function mapLimit(inputs, limit, iterateeFn, callback) {
    // Splitting the inputs array into batches of size 'limit'
    const chopped = chop(inputs, limit);
    // console.log("chopped", chopped); // Logging the chopped batches for debugging
  
    // Reducing the chopped batches into a single promise chain
    let finalResult = chopped.reduce((acc, current) => {
        console.log("acc", acc)
      // Chain the current batch processing to the promise accumulator
      return acc.then((val) => {
        return new Promise((resolve, reject) => {
          let temp = [];
          current.forEach((curr) => {
            // Processing each item in the current batch with iterateeFn
            iterateeFn(curr, (result) => {
              // Collecting results of the current batch
              temp.push(result);
  
              // Resolving the promise when all items in the batch are processed
              if (temp.length === current.length) {
                resolve([...val, ...temp]);
              }
            });
          });
        });
      });
    }, Promise.resolve([])); // Initial promise that resolves to an empty array
  
    // Calling the final callback with the accumulated results
    finalResult.then((result) => {
      callback(result);
    });
  }
  
  // Example usage of the mapLimit function
  mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
    console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
  });
  
  // Explanation:
  // 1. The inputs array [1, 2, 3, 4, 5] is split into batches of 2: [[1, 2], [3, 4], [5]].
  // 2. The batches are processed sequentially. Within each batch, items are processed concurrently.
  // 3. Each item is processed by the async function getNameById, which simulates an async operation.
  // 4. The results of each batch are collected and concatenated to form the final result.
  // 5. The f
  

//   [1, 2, 3, 4, 5]
//   [[1, 2], [3, 4], [5]] - limit is 2
// input in a single batch can be processed concurrently / parallely --> async in parallel
// each batch will be processed sequentially / parallely --> async in sequence




