`Problem 1`

var foo = 1; // Global variable foo is assigned the value 1

var change = () => { // Arrow function assigned to variable change
  this.foo = 2; // Setting the value of the global variable foo to 2 using 'this' in an arrow function (which does not have its own 'this' binding)
  console.log(this.foo); // Logging the value of the global variable foo (which is 2)
};

var obj = { // Object obj with property foo
  foo: 3
};

var bounded = change.bind(obj); // Binding the change function to the obj object and assigning it to the variable bounded

// Output the values of variables and execute functions
console.log(foo); // Outputs 1 (the value of the global variable foo)
console.log(change()); // Outputs 2 (the value of the global variable foo after the change function is executed)
console.log(foo); // Outputs 2 (the value of the global variable foo has been changed to 2 by the change function)
console.log(obj.foo); // Outputs 3 (the value of the foo property of the obj object)
console.log(bounded()); // Outputs 2 (the value of the foo property of the obj object after executing the change function, bound to obj)

// Arrow functions always take up the definition scope, not the calling scope. Therefore, .bind doesn't work with them. Arrow functions do not have their own this binding, so binding an arrow function does not affect the value of this inside the function.




`Problem 2`

let saiyan = {
    name: "Vegeta",
    chiBlasts: {
      low: "Big bang attack",
      med: "Gallic gun",
      high: "Final flash",
    },
  };

// Copying saiyan object to anotherSaiyan
let anotherSaiyan = { ...saiyan };
anotherSaiyan.name = "Goku"; // Changing name in anotherSaiyan
anotherSaiyan.chiBlasts.high = "Spirit Bomb"; // Changing high chiBlast in anotherSaiyan

// Copying saiyan object to sonOfSaiyan
let sonOfSaiyan = Object.assign({}, saiyan);
sonOfSaiyan.name = "Trunks"; // Changing name in sonOfSaiyan
sonOfSaiyan.chiBlasts.high = "Finish Buster"; // Changing high chiBlast in sonOfSaiyan

// Deep copying anotherSaiyan to sonOfAnotherSaiyan
let sonOfAnotherSaiyan = JSON.parse(JSON.stringify(anotherSaiyan));
sonOfAnotherSaiyan.name = "Gohan"; // Changing name in sonOfAnotherSaiyan
sonOfAnotherSaiyan.chiBlasts.high = "Kamehameha"; // Changing high chiBlast in sonOfAnotherSaiyan

// Outputting names of saiyan, anotherSaiyan, sonOfSaiyan, and sonOfAnotherSaiyan
console.log(
    saiyan.name,
    anotherSaiyan.name,
    sonOfSaiyan.name,
    sonOfAnotherSaiyan.name
  );

// Outputting high chiBlasts of saiyan, anotherSaiyan, sonOfSaiyan, and sonOfAnotherSaiyan
console.log(
    saiyan.chiBlasts.high,
    anotherSaiyan.chiBlasts.high,
    sonOfSaiyan.chiBlasts.high,
    sonOfAnotherSaiyan.chiBlasts.high
  );
//   Object.assign(target, ...sources): This method is used to copy the values of all enumerable own properties from one or more source objects to a target object. 


`Problem 3:`

let num = 0;

async function increment() { 
    num += await 2; 
    console.log(num); 
}

increment(); 

num += 1;

console.log(num);

`The output is 1, 2 because

when the function increment() is executed and await keyword is found in an async function, then whatever statement is after await starts acting as a Promise resolve, therefore the execution pauses over-there and moves to the line below increment() call. Thereby executing num += 1; console.log(num); and logging 1.

When the call stack becomes empty the control returns back to await 2 and now the statement over there is num = num + 2 the 2nd num over here still being 0, so 0 + 2 = 2. Therefore 2 gets logged.`