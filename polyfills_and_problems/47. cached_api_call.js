// Atlassian frontend interview question
`
To optimize API call efficiency by reducing redundant requests and minimizing latency 
through a caching mechanism.`;

// cachedAPI is a higher-order function that returns a caching function for API calls.
// It takes a 'time' parameter that specifies how long the cache should be valid in
// milliseconds.
const cachedAPI = (time) => {
  // 'cache' is an object that stores the cached API responses.
  // The closure ensures that 'cache' is preserved across multiple calls to the returned
  // function.
  const cache = {};

  // The function returned by cachedAPI makes the actual API calls and handles caching.
  return async (url, config = {}) => {
    // 'key' is a unique identifier for each request, combining the URL and config object.
    const key = `${url}${JSON.stringify(config)}`;

    // 'entry' retrieves the cached response for the given key, if it exists.
    let entry = cache[key];

    // Check if there is no cached entry or if the cached entry has expired.
    if (!entry || Date.now() > entry.expiry) {
      console.log("Making a fresh API Call!");
      try {
        // Make the actual API call using fetch.
        let response = await fetch(url, config);
        // Parse the JSON response.
        const results = await response.json(); // Added 'await' to correctly handle the promise
        // returned by response.json()

        // Store the response in the cache with an expiry time.
        cache[key] = { value: results, expiry: Date.now() + time };
      } catch (err) {
        // Log any errors that occur during the API call.
        console.log("err while making an API call: ", err);
      }
    }

    // Return the cached value.
    return cache[key] ? cache[key].value : null
  };
};

// Create a cached API function with a cache duration of 1500 milliseconds (1.5 seconds).
const call = cachedAPI(1500);

// Make the first API call.
// Since there is no cached response, it will log "Making a fresh API Call!" and make
// the API request.
call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
  console.log("first: res", res)
);

// Schedule a second API call after 800 milliseconds.
// This call will use the cached response because it is within the 1500 milliseconds cache
//  duration.
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
    console.log("second: res", res)
  );
}, 800);

// Schedule a third API call after 1800 milliseconds.
// Since the cache duration is 1500 milliseconds, the cache will have expired, and a
// fresh API call will be made.
setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((res) =>
    console.log("third: res", res)
  );
}, 1800);
