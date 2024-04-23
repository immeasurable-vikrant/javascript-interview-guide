//A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

// The consumer of a callback-based API writes a function that is passed into the API. The provider of the API (called the caller) takes the function and calls back (or executes) the function at some point inside the caller's body. The caller is responsible for passing the right parameters into the callback function. The caller may also expect a particular return value from the callback function, which is used to instruct further behavior of the caller.

// There are two ways in which the callback may be called: synchronous and asynchronous. Synchronous callbacks are called immediately after the invocation of the outer function, with no intervening asynchronous tasks, while asynchronous callbacks are called at some point later, after an asynchronous operation has completed.

setTimeout(function () {
  console.log("timer");
}, 5000);

function x(y) {
  console.log("x");
  y();
}

x(function y() {
  console.log("y");
});

//Event Listners
document.getElementById("clickMe").addEventListener("click", function xyz() {
  console.log("Clicked");
});

//Count how many times a button is clicked

// 1. using a gloabl variable (using global variable is not a good solution)

let count = 0;
document.getElementById("clickMe1").addEventListener("click", function xyz1() {
  console.log("Clicked", ++count);
});

// 2. using a Closure - we can ensure that count cannot be modified by anything in our program and be secured and private (data hiding)

function attachEventListners() {
  //It basically forms a closure (go to Elements on a broswer, click on a tab called "Event Listners" - there you will find an event - handler - scope - and a closure)
  let count = 0;
  document
    .getElementById("clickMe2")
    .addEventListener("click", function xyz2() {
      console.log("Clicked", ++count);
    });
}

// Important:


//Remove Event listeners - developers remove event listners on certain events

// Event Listners are heavy that means it takes memory, so whenever you attach an event listener it kind of forms a closure 
// Event listeners consumes a lot of memory which can potentially slow down the website therefore it is good practice to remove if it is not used.

// free up memory by removing event listeners which are not in use, if we remove these eventListeners - all the variables which are held by a closure will be garbage collected.