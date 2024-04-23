// Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase. This means that you can use variables and functions before they are declared in your code. However, it’s important to note that only the declarations are hoisted, not the initializations.

// 1. Variable Hoisting:

console.log(x); // undefined - In this example, the var x declaration is hoisted to the top of the scope during compilation.
var x = 5;
console.log(x); // 5




// 2. Function Hoisting:
sayHello(); // Hello World!

function sayHello() {
  //Functions declared with the function keyword are hoisted along with their entire body.
  console.log("Hello, World!");
}




// 3. Hoisting with Function Expressions:
greet();

var greet = function () {
  console.log("Greetings!");
};
// Output:
// TypeError: greet is not a function



// Problem 1:

(function emp() {
  (function cust() {
    var a = 0;
    return (a = 1 + 4);
  })();
  a = 6;
  return a;
})();

// 1. Global Context Creation:
// The JavaScript engine starts by creating the global execution context.

// 2. Execution of the IIFE (emp):
//  - As soon as the JavaScript engine encounters the outer IIFE (function emp() { ... })();,
// it creates a  new execution context named "emp".
// - Inside this "emp" execution context:
//     - The inner IIFE (function cust() { ... })(); is invoked.
//     - As it's invoked immediately, a new execution context named "cust" is created.
// - Inside this "cust" execution context:
//    - Variable a is declared and initialized to 0.
//    - The expression 1 + 4 is evaluated and assigned to a, making a equal to 5.
//    - The return value is 5, but it's not captured or used.
// - The "cust" execution context finishes and is popped off the stack.
// - Variable a is assigned the value 6 in the "emp" execution context.
//    - a now holds the value 6.
//    - The value of a (which is 6) is returned from the outer IIFE.

// Variable Environment:

// The "emp" execution context contains the variable a, which holds the value 6.
// The "cust" execution context contains the variable a, which holds the value 5.





// Problem 2:

function foo() {
  return "I'm the outer function";
}
function test() {
  console.log(bar);
  return foo();
  var bar = "I'm a variable";
  function foo() {
    return "I'm the inner function";
  }
}
// console.log(test());

//Output: undefined I'm the inner function

// HOISTING VERSION::
function foo() {
  return "I'm the outer function";
}

function test() {
  var bar; // Variable declaration is hoisted
  function foo() {
    return "I'm the inner function";
  }

  console.log(bar); // Logs "undefined" because the initialization is not hoisted yet
  return foo(); // Invokes the inner function
  bar = "I'm a variable"; // Variable initialization is moved down, but this line is never reached
}

console.log(test()); // Logs "I'm the inner function"



// Problem 3:
function parent() {
  var hoisted = "'I'm a variable";
  function hoisted() {
    return "I'm a function";
  }
  return hoisted();
}
console.log(parent());

Output:
// Uncaught TypeError: hoisted is not a function

Explanation: 
// In JavaScript, function declarations are hoisted above variable declarations, while variable declarations are hoisted above other types of declarations like function expressions.
//  Important: Function declarations are hoisted before variable declarations.

// here's the code after hositing:
// function parent() {
//   function hoisted() { // Function declaration overrides variable declaration
//     return "I'm a function";
//   }
//   var hoisted = "'I'm a variable"; // Variable declaration
//   return hoisted(); // Attempting to call the variable as a function, which is not a function 
// (it's now a string)
// }
// console.log(parent());

// HOISTED FUNCTION
function parent() {
  var hoisted

  function hoisted() {
    return "I'm a function";
  }

  hoisted = "'I'm a variable"; 

  return hoisted();
}
console.log(parent());


// Example 4:

function parent1() {
  return hoisted();
  var hoisted = "'I'm a variable";
  function hoisted() {
    return "I'm a function";
  }
}
console.log(parent1());

Output:
"I'm a function";


// HOISTED

function parent1() {
  var hoisted;

  function hoisted() {
    return "I'm a function";
  }

  return hoisted();

  hoisted = "'I'm a variable";
}
console.log(parent1());


// Example 5:

function parent() {
  var hoisted = "'I'm a variable";
  var hoisted  = function hoisted() {
    return "I'm a function";
  }
  return hoisted();
}
console.log(parent());

Output:
'I am a function'





// HOISTING
console.log(parent());

function parent() {
  var hoisted; // Variable declaration is hoisted

  hoisted = "'I'm a variable"; // Variable assignment

  hoisted = function hoisted() {
    return "I'm a function";
  }; // Variable assignment (overwriting the previous value)

  return hoisted(); // This will now invoke the function, not the initial variable
}


// Example 6:


function parent() {
  console.log("1", hoisted);
  var hoisted = "I'm a variable";
  console.log("2", hoisted);
  function hoisted() {
    return "I'm a function";
  }
  console.log("3", hoisted);
}
parent();

output: 
function hoisted() {
  return "I'm a function";
 } 
// I'm a variable 
// I'm a variable



// HOISTING VERSION
function parent() {
  var hoisted;
  function hoisted() {
    return "I'm a function";
  }

  console.log("1", hoisted); 
  hoisted = "I'm a variable";
  console.log("2", hoisted);
  console.log("3", hoisted);
}
parent();


// Example 7:

// using var
function example() {
  if (true) {
    var x = 10; 
  }
  console.log(x);
}

example();
// output: 10



//  using let
function example() {
  if (true) {
    let x = 10; 
  }

  console.log(x);
}

example();
// output: undefined
