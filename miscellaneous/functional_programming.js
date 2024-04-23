// Functional programming is a paradigm of building computer programs using expressions and functions without mutating state and data.

// By respecting these restrictions, functional programming aims to write code that is clearer to understand and more bug resistant. This is achieved by avoiding using flow-control statements (for, while, break, continue, goto) which make the code harder to follow. Also, functional programming requires us to write pure, deterministic functions which are less likely to be buggy.


// Pure vs. Impure Functions
// Pure functions take some input and give a fixed output. Also, they cause no side effects in the outside world.

// const add = (a, b) => a + b;
// Here, add is a pure function. This is because, for a fixed value of a and b, the output will always be the same.


// getId is not a pure function. The reason being that it uses the global variable SECRET for computing the output. If SECRET were to change, the getId function will return a different value for the same input. Thus, it is not a pure function.

// let id_count = 0;
// const getId = () => ++id_count;

// This is also an impure function, and that too for a couple of reasons—(1) it uses a non-local variable for computing its output, and (2) it creates a side effect in the outside world by modifying a variable in that world.

// getId is impure illustration
// This can be troublesome if we had to debug this code.

// What’s the current value of id_count? Which other functions are modifying id_count? Are there other functions relying on id_count?

// Because of these reasons, we only use pure functions in functional programming.

// Another benefit of pure functions is that they can be parallelized and memoized. Have a look at the previous two functions. It’s impossible to parallelize or memoize them. This helps in creating performant code.



// The Tenets of Functional Programming
// So far, we have learned that functional programming is dependent on a few rules. They are as follows.

// Don’t mutate data
// Use pure functions: fixed output for fixed inputs, and no side effects
// Use expressions and declarations
// When we satisfy these conditions, we can say our code is functional.




// const SECRET = 42;  
// const getId = (a) => SECRET * a;
