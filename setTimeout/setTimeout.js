//Example 1:
console.log("start")

setTimeout(function(){
    console.log("Callback")
}, 5000)

console.log("end")

//Example 2: blocking a main thread

console.log("start")

setTimeout(function(){
    console.log("Callback")
}, 5000)

console.log("end")
let startDate = new Date().getTime();
let endDate = startDate;

while(endDate < startDate + 10000){
    endDate = new Date().getTime();
}


console.log("while expires!")

Explaination: 
// setTimeout is called, "end" is logged, and then the while loop starts, which takes about 10 seconds to complete. During this time, the callback scheduled by setTimeout waits in the event queue until the call stack is empty. However, since the while loop is "blocking the event loop", the callback won't be executed until the loop completes.


// Example: 3

console.log(1);
setTimeout(function() {
  console.log(2);
}, 1000);
setTimeout(function() {
  console.log(3);
}, 0);
console.log(4);

Output: 1, 4, 3, 2



// Example: 4

function say(a) {
  alert(a);
}
say(1);
setTimeout(say(2), 5000);
setTimeout(function() {
  say(3);
}, 1000);
setTimeout(say, 2000, 4);

// say(1); is called immediately, displaying an alert with the message "1".
// say(2) is called immediately, displaying an alert with the message "2". Then, setTimeout receives undefined as its first argument, because say(2) doesn't return a function. This results in an error.
// Since an error occurs, the subsequent setTimeout calls may not execute as expected.
// The script execution stops because of the error, and nothing further executes.

// What's wrong? How fix? -->  setTimeout(() => say(2), 5000);


// Example: 5
var a = function(i) {
    console.log(i);
  };
  var b = function(i) {
    console.log(i);
  };
  for (var i = 0; i < 5; i++) {
    a(i);
  }
  for (var i = 4; i >= 0; i--) {
    b(i);
  }


// Example: 6
var list = readHugeList();
var nextListItem = function() {
  var item = list.pop();
  if (item) {
    // process the list item...
    nextListItem();
  }
};



// Example: 7

(function() {
  console.log(1);
  setTimeout(() => console.log(2), 1000);
  setTimeout(() => console.log(3), 0);
  Promise.resolve(true).then(() => console.log(4));
  console.log(5);
})();


// Example: 8

try {
  setTimeout(function() {
    throw new Error();
  }, 1000);
} catch (e) {
  alert( e);
}


Example: 9
while (true){
    console.log(1);
    setTimeout(() => console.log(2), 1000);
    setTimeout(() => console.log(3), 0);
    Promise.resolve(true).then(() => console.log(4));
    console.log(5);
  }

  // Output: 
//   1
//   5
//   1
//   5
//   1
//   5
//   1
//   5
//   .
//   .
//   .
//   .
//   .


// Innovaccer Round 1:
while(true) {
    setTimeout(() => console.log('1'), 3000);
    setTimeout(() => console.log('2'), 2000);
    setTimeout(() => console.log('3'), 1000);
    setTimeout(() => console.log('4'), 0);
    setTimeout(() => console.log('5'), 0);
}

// Output: 
// 4
// 5
// 3
// 2
// 1
// .
// .
// . 
// .

// Explaination: The while(true) loop creates an infinite loop that continues forever.
// the output will be an infinite loop of printing 4 and 5 with occasional appearances of 1, 2, and 3, which might not be noticeable due to the rapid and continuous printing of 4 and 5.
// since the loop is infinite, the timeouts will keep getting added to the event queue without any new events being processed, and the browser will eventually stop responding or crash.
