`To enhance the reliability and responsiveness of HTTP requests in a frontend application by 
implementing a mechanism that ensures requests do not hang indefinitely by setting a timeout.`;

// fetchWithTimeout function performs a fetch request with a timeout mechanism.
// If the fetch takes longer than the specified duration, the request is aborted.
const fetchWithTimeout = (url, duration) => {
  return new Promise((resolve, reject) => {
    // Create an AbortController instance to control the fetch request.
    const controller = new AbortController();
    const signal = controller.signal; // The signal object to communicate with the fetch request.

    let timerid = null; // Variable to hold the timeout ID.

    // Start the fetch request with the provided URL and the abort signal.
    fetch(url, { signal })
      .then((resp) => {
        clearTimeout(timerid); // Clear the timeout since the fetch completed successfully.
        resolve(resp); // Resolve the promise with the response.
      })
      .catch((error) => {
        // If the fetch request fails (e.g., due to network issues or abortion), reject the promise with the error.
        reject(error);
      });

    // Set a timeout to abort the fetch request if it takes longer than the specified duration.
    timerid = setTimeout(() => {
      console.log("Aborted"); // Log that the fetch request is being aborted.
      controller.abort(); // Abort the fetch request.
    }, duration);
  });
};

// Example usage of fetchWithTimeout.
// Attempt to fetch data from the provided URL, with a timeout of 5000 milliseconds (5 seconds).
fetchWithTimeout("https://jsonplaceholder.typicode.com/todos/1", 5000)
  .then((resp) => {
    return resp.json(); // Parse the response as JSON.
  })
  .then((data) => {
    console.log(data); // Log the parsed JSON data.
  })
  .catch((error) => {
    console.error(error); // Log any errors that occur during the fetch, JSON parsing, or if it is aborted.
  });

`
  What is an AbortController?

  An AbortController is a built-in JavaScript feature that provides a way to abort (or cancel) 
  asynchronous tasks, such as network requests (e.g., Fetch API) or timers. It allows you to 
  signal to a running task that it should be aborted, providing a mechanism to control and 
  manage asynchronous operations.
  
  An AbortController is a JavaScript feature that allows you to cancel asynchronous tasks, 
  such as network requests or timers.
  
  Why is AbortController Used?

  It's used to:
  - Set timeouts on tasks, preventing indefinite waiting.
  - Cancel tasks in response to user actions or changing requirements.
  - Manage resources efficiently by stopping unnecessary tasks.


  How to Use AbortController:

  Create Controller:

  const controller = new AbortController();

  Access Signal:

  const signal = controller.signal;


  Abort Task:

  controller.abort();


  Listen for Abortion:

  if (signal.aborted) {
      // Handle abortion
  }


  Integrate with Asynchronous Operations:
  
  fetch(url, { signal });
  By using AbortController, you can efficiently manage asynchronous tasks, set timeouts, and 
  improve application responsiveness.



`;
