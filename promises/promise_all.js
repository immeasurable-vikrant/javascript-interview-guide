// Promise.all efficiently handle multiple asynchronous operations concurrently.

// It takes an array of Promises as input and returns a "new Promise" that resolves with
// an array of the resolved values when all input Promises are resolved.If any of the
// input Promises reject, the entire Promise.all is rejected.