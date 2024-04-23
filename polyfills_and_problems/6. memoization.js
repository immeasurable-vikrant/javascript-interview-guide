// Memoization only works for Pure functions


// polyfill for memoized function
function myMemoized(fn, context) {
    const cache = {};
    return function (...args) {
      var key = JSON.stringify(args);
      if (!cache[key]) {
        cache[key] = fn.call(context || this, ...args);
      }
      return cache[key];
    };
  }
  
  const clumsyProduct = (num1, num2) => {
    for (let i = 1; i <= 10000000; i++) {}
      return num1 * num2;
  };
  
  const memoizedClumzyProduct = myMemoized(clumsyProduct);
  console.time("First Call");
  console.log(memoizedClumzyProduct(9467, 7649));
  console.timeEnd("First Call");
  
  console.time("Second Call");
  console.log(memoizedClumzyProduct(9467, 7649));
  console.timeEnd("Second Call");
  
  
  // Fibonacci - Problem 1
  const fibonacci = (n, memo = {}) => {
    if (n <= 1) return n;
    if (!memo[n]) {
      memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    }
    return memo[n];
  };
  
  console.log(fibonacci(6))
  
  
  
  // factorial - problem - 2

  //Slow:
  function factorial_slow(n){
    if(n === 0 || n === 1){
        return 1
    }
    return factorial(n - 1) * n
  }

  console.log(factorial_slow(5))

  //Fast using memoization
  const factorial = (n, memo = {}) => {
    if (n === 0 || n === 1) return 1;
    if (!memo[n]) {
      memo[n] = n * factorial(n - 1, memo);
    }
    return memo[n];
  };
  
  console.log(factorial(6))
  
  