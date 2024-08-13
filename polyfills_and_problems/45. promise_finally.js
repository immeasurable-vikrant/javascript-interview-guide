// Polyfill for Promise.prototype.finally
Promise.prototype.finally = function (callback) {
  // Ensure the callback is a function
  if (typeof callback !== 'function') {
    return this.then(callback, callback);
  }

  // Attach a then handler for fulfillment and a catch handler for rejection
  return this.then(
    // On fulfillment, run the callback and pass the value through
    (value) => {
      return Promise.resolve(callback()).then(() => value);
    }
  ).catch((reason) => {
    // On rejection, run the callback and rethrow the error
    return Promise.resolve(callback()).then(() => { throw reason; });
  });
};

// Example usage of finally
const promise = new Promise((resolve, reject) => {
  // Simulate asynchronous operation
  setTimeout(() => {
    resolve("Success!");
    // Or simulate rejection with reject("Error!");
  }, 1000);
});

promise
  .then((result) => {
    console.log("Promise fulfilled with:", result);
  })
  .catch((error) => {
    console.error("Promise rejected with:", error);
  })
  .finally(() => {
    console.log("Cleanup operations completed.");
  });
