// Closures - A closure is formed when a function along with its lexical scope is bundled together. This means that the function retains access to variables from its parent scope even after the parent function has finished executing.
// This allows the function to "close over" those variables and access them later, even when it's invoked outside its original lexical scope.

// In JavaScript, closures are created every time a function is created, at function creation time.

// example: 1
function func1() {
  var a = 7;
  function insideFunc1() {
    console.log(a);
  }
  insideFunc1();
}
// func1(); // 7

//example: 2
function func2() {
  var a = 7;
  function insideFunc2() {
    console.log(a);
  }
  return insideFunc2;
}
// or
function func2a() {
  var a = 7;
  return function insideFunc2a() {
    console.log(a);
  };
}
var z2 = func2a();
console.log("z2", z2); //  function y(){console.log(a)}

z2(); // 7 - functions when returned from another function they still maintains their lexical scope, they remember where they were actually present. Though 'func2a' is no longer exists but still 'insideFunc2a' function remember its lexical scope

// Example : 3
function func3() {
  var a = 7;
  function insideFunc3() {
    console.log(a);
  }
  a = 100;
  return insideFunc3;
}
var z2 = func3();
z2(); // 100



// // output will be 100 because it won't store the "*value*" of 'a' in our case 7. The value  7 doesn't persists, it is the "*reference to 'a' *"" persists. The function remembers the "a's" memory location.

// Example : 4 accessing variables from deepest functions? will it still be a closure? answer - yes
function func4() {
  var b = 1000;
  function insideFunc4() {
    var a = 7;
    function insideFunc4a() {
      console.log(a, b);
    }
    a = 100;
    insideFunc4a();
  }
  insideFunc4();
}
func4(); // 100 1000

// Example : 5 SetTimeout
function func5() {
  var i = 1;
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// func5();

// Example :6 SetTimeout
function func6() {
  var i = 10;
  setTimeout(function () {
    console.log(i);
  }, 1000);
  console.log("I will run first");
}
func6(); //function () {console.log(i);} forms a "closure", this function remembers the reference to 'i' & what setTimeout do is it takes this callback function and attaches a timer of 1000ms and it stores it somewhere and the JS proceeds and it doesn't wait for anything.

// Example :7 - Print 1, 2, 3.....10 every ith second.

function func7() {
  var i = 1;
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("I will run first");
}
func7();
// 1 sec passed - 6
// 2 sec passed - 6
// 3 sec passed - 6
// 4 sec passed - 6
// 5 sec passed - 6
// 6 sec passed - 6

// Explaination: It is working this way because of the Closure. Closure is formed when a function along with its lexical environment.
// Important - Even when a function is taken out from its original scope, if it is executed in some other scope still it remembers the lexical environment it can access to those variables of its lexical scope.

//  so, what will happen when a setTimout function takes this function and stores it somewhere(in a queue) and attaches a timer so that function remembers the reference to the "i" not the value of "i".

// when the loop runs the first time so it like of kind of makes a copy of this function and attaches a timer and also remebers the reference to "i". Similarly, these 5 copies of this function all of them are pointing to same refernece of "i", because the environment for all of them are same. It refers to the same memory space.

// JS doesnt wait for anything, it will run the loop again n again, setTimeout will store that function - all of these five functions & JS will move on, it doesnt wait for those timers to get expired. so it will print "I will run first" & when the timer expires it is "too late". so loop was continuously running so it was 1, 2, 3, 4, 5, 6 so the "i" value became 6 so by the time this callback function runs "function() { console.log(i)}" that time the value of i i.e var i = 6, in the memory location it is 6. all of these five copies of callback functions are referring to the same spot in the memory & that is this var = i variable which has now run five times and its value because of "i++" has gone to "6". It is behaving this way if retrospect, we get to know that it is because this "i" console.log(i) for each & every copy of a function is referring to the same spot in the memory i.e "i", var i = 1; which has now become "6".

// FIX: use "let" over there
// let has a block scope that means for each and every iteration, "i" is a new vaiable altogether, it is a new copy of "i" altogether & each time setTimeout is run this callback function "function() { console.log(i)}" has a new copy of "i" with it.
// Output:  1 2 3 4 5
function func8() {
  var i = 1;
  for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
  console.log("I will run first");
}
func8();


// In the first case, the issue is related to variable scoping in JavaScript. When you declare the variable i using var inside the for loop, it is hoisted to the function scope, meaning there's only one i variable shared across all iterations of the loop. So, by the time the setTimeout callbacks are executed, the loop has already finished, and i holds the value 6. That's why you see 6 printed five times after one second delay each.

// In the second case, the let keyword is used to declare the variable i inside the for loop. Unlike var, let has block-level scope. So, each iteration of the loop creates a new lexical environment for the variable i, preserving its value. That's why you get the expected output: 1, 2, 3, 4, 5 printed each after one second delay.

// Use - Closure to achieve same result as "let"

function func9() {
  var i = 1;
  for (var i = 1; i <= 5; i++) {
    function close(j) {
      setTimeout(function () {
        console.log(j);
      }, j * 1000);
    }
    close(i)
  }
  console.log("I will run first");
}
func9();
Explaination:
// In each iteration of the loop, a new instance of the close function is created.
// This new instance of close captures the current value of i as its parameter j through closure.
// When close(i) is called, it schedules a setTimeout callback function, which, through closure, retains the value of j associated with that particular invocation of close.
// Each setTimeout callback function executes after its respective delay (based on j), and it prints the value of j.

// It's correct to say that each invocation of the close function creates a new copy of j for itself, capturing the value of i at that specific iteration through closure.
// Each setTimeout callback function stored in memory (or the event queue) remembers the unique value of j associated with the invocation of close that created it.


// Example 10: 
var func = [];
for (var i = 0; i < 5; i++) {
  func[i] = function() {
    console.log(i);
  };
}
func[3]();
//Explaination:
// 1. An array func is initialized.
// 2.Inside the loop, a function is defined and assigned to each element of the array func. This function logs the current value of i.
// 3. However, since var is used to declare i, it is hoisted to the function scope, not block scope. This means there's only one i variable shared across all iterations of the loop.The var i declaration is hoisted to the scope in which the loop resides, which is the global scope if this code is executed at the top level.
// Therefore, there's only one i variable shared across all iterations of the loop, within the same scope.

// 4. By the time func[3]() is called, the loop has already completed, and i has reached its final value, which is 5.
// 5. When any of the functions within func are executed, they refer to the same i variable in the outer scope, which now holds the value 5. Hence, they all log 5.

// The surprising part comes from the fact that JavaScript has function-level scope but not block-level scope for variables declared with var. When the functions in the loop are executed, they all share the same variable i, which is declared with var. At the end of the loop, i will have the value 5. So, when any of the functions in the func array is called, it will log 5, not the value of i when the function was defined.
// This behavior happens because each function created inside the loop forms a closure over the same variable i, which retains its reference even after the loop finishes executing. Hence, when func[3]() is called, it accesses the variable i in the outer scope, which is now 5.

// If you want to capture the value of i at each iteration, you can use an Immediately Invoked Function Expression (IIFE) to create a separate scope for each iteration:
var func = [];
for (var i = 0; i < 5; i++) {
  (function(index) {
    func[index] = function() {
      console.log(index);
    };
  })(i);
}
func[3]();

// In the loop, an IIFE (Immediately Invoked Function Expression) is used.
// This IIFE creates a new scope for each iteration of the loop.
// Inside each scope, a function is defined and stored in the array func.
// These functions capture the value of i at the time they are created, thanks to closures.
// When func[3]() is called, it executes the function stored at index 3.
// Since each function captured the value of i at its creation, func[3]() prints the value of i at that time, which is 3.





// Example 11:

function outest(){
  var c = 20;
  function outer(b){
    function inner(){
      console.log(a, b, c)
    }
    let a = 10;
    return inner;
  }
  return outer;
}
let a = 100;
var close = (outest())("Hello World!");
close(); // 10 Hello World! 20


//Create a closure function for a counter in JavaScript
// This is also an example of data hiding and encapsulation, here you are hiding count from outer world! as if you try to access it outside the function it will give reference error. We have a privacy over this "count" & we have acheived it throught function, it forms a closure with "count".



function createCounter() {
  let count = 0; // This variable is within the scope of the createCounter function
  function increment() {
    // This inner function has access to the outer variable `count` due to closure
    count = count + 1;
    return count;
  }
  return increment; // Return the inner function, which maintains access to `count`
}

// Usage:
// const counter = createCounter(); // Initialize the counter
// console.log("createCounter", counter()); // Output: 1
// console.log("createCounter", counter()); // Output: 2
// console.log("createCounter", counter()); // Output: 3








// Nested Functions: A closure typically involves a function (the inner function) defined inside another function (the outer function).

// Access to Outer Scope Variables: The inner function has access to the variables and parameters of the outer function, as well as any variables in its parent scopes.

// Preservation of State: Closures “remember” the scope in which they were created. Even if the outer function has completed its execution, the inner function can still access and modify the variables from the outer function’s scope.

// Use of Closures:
//  - Module design patterns
//  - currying
//  - function like once
//  - memoize
//  - maintaining state in async world
//  - setTimeout
//  - Iterators and etc






// Some more problems on Closure:
function outer() {
  const outerVar = "I'm from the outer function";

  function inner() {
    console.log(outerVar); // Accesses the outerVar from the outer function's scope
  }

  return inner; // Return the inner function
}

const closureFunction = outer(); // The inner function is assigned to closureFunction
closureFunction(); // When invoked, it still has access to outerVar






//Example countdown:
function countdown() {
    let count = 10;
    const interval = setInterval(function() {
      console.log(count);
      count--;
      if (count === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
  
  // Call the countdown function to start the countdown
  countdown();
