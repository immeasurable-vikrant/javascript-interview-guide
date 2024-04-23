// In JavaScript, the this keyword refers to an object, which object depends on how this is being invoked (used or called).

// this in global space
// Anything defined globally is said to be in a global space.

console.log(this); // refers to global object i.e. window in case of browser
// 💡 global object differs based on runtime environment,
// this inside a function

function x() {
	// the below value depends on strict/non-strict mode
	console.log(this);
	// in strict mode - undefined
	// in non-strict mode - refers to global window object
}
x();

// 💡 Notes:
// On the first go feels like `this` keyword in global space and inside function behaves same but in reality it's different.

// The moment you make JS run in strict mode by using: "use strict" at the top, `this` keyword inside function returns `undefined` whereas global space will still refers to global window object
// this substitution -> According to this substitution, if the value of this keyword is null/undefined, it will be replaced by globalObject only in non-strict mode. This is the reason why this refers to global window object inside function in non-strict mode.

// 💡 So to summarize, the value of this keyword inside function is undefined, but because of this substitution in non-strict mode this keyword refers to globalWindowObject and in strict mode it will still be undefined

// this keyword value depends on how the function is called. For eg:

// In strict mode:
x(); // undefined
window.x(); // global window object

// this inside a object's method
// `x` key below is a method as per terminology
const obj = {
	a: 10,
	x: function () {
		console.log(this); // {a: 10, x: f()}
		console.log(this.a); // 10
	},
};
obj.x(); // value of `this` is referring to current object i.e. `obj`
// call, apply & bind methods
const student = {
	name: "Alok",
	printName: function () {
		console.log(this.name);
	},
};
student.printName(); // Alok

const student2 = {
	name: "Kajal",
};
student2.printName(); // throw error

// ❓ how to re-use printName method from `student` object
student.printName.call(student2); // Kajal
// Above `call` method is taking the value of `this` keyword
// So, Inside `printName` method value of `this` is now `student2` object

// So, call, bind and apply is used to set the value of this keyword.
// this inside arrow function

// Arrow function doesn't have their own "this" value, they take the value from "enclosing lexical context".
// In JavaScript, arrow functions do not have their own this context. Instead, they lexically capture the 'this' value from their surrounding code. In our example, the arrow function x is defined within the object obj1, but because it's an arrow function, it doesn't have its own 'this' context.

const obj1 = {
	a: 10,
	x: () => {
		console.log(this); // window object
		// Above the value of `this` won't be obj anymore instead it will be enclosing lexical context i.e. window object in current scenario.
	},
};
obj.x();

const obj2 = {
	a: 10,
	x: function () {
		const y = () => {
			console.log(this);
			// Above the value of `this` will be obj2 as function y's enclosing lexical context is function `x`.
		};
		y();
	},
};
// Since y is defined inside the function x, its lexical scope is the same as that of x.
obj2.x();

// this inside DOM
// It refers to HTML element.
//<button onclick="alert(this)">Click Me</button>
//<!-- [object HTMLButtonElement] Button element -->

// Problem a.
let a = 5;
console.log(this.a); //undefined

//Problem b.
function myFunction() {
	console.log(this);
}
myFunction(); // window object

//Problem c.
const myFun = () => {
	console.log(this);
};
myFun(); // window object

//Problem d.
let user1 = {
	name: "Patrick Bateman",
	age: 24,
	getDetails() {
		console.log(this.name); //Patrick Bateman
	},
};

//Problem e.
let user2 = {
	name: "Patrick Bateman",
	age: 24,
	childObj: {
		newName: "Patrick Bateman",
		getDetails() {
			console.log(this.newName, "and", this.name);
		},
	},
};
// this keyword inside the getDetails method refers to the childObj object, not the user2 object.
user2.childObj.getDetails(); // Patrick Bateman and undefined

// Problem f.
let user3 = {
	name: "Patrick Bateman",
	age: 24,
	getDetails: () => {
		console.log(this.name);
	},
};

let user4 = {
	name: "Patrick Bateman",
	age: 24,
	getDetails() {
		const nestedArrow = () => {
			console.log(this.name);
		}; //Patrick Bateman
		nestedArrow();
	},
};

// The arrow function nestedArrow inside getDetails captures the this value from getDetails, which is the user4 object, allowing it to access user4.name and print
// "Patrick Bateman".
user4.getDetails(); // Patrick Bateman

class User5 {
	constructor(n) {
		this.name = n;
	}
	getName() {
		console.log(this.name);
	}
}

const user5 = new User5("Patrick Bateman"); // => This will generate a user object from the above class

// When user5.getName() is called, 'this' inside the getName method refers to the user5 instance, so this.name accesses the name property of user5.
user5.getName();

class User5a {
	constructor() {
		this.value = 42;
	}

	getValue = () => {
		console.log(this.value);
	};
}

// When arrow functions are used for class methods, they capture this from the lexical scope in which they are defined. However, since they are often defined within the class body, the lexical scope is still the class itself.
const user5a = new User5a();
user5a.getValue(); // Output: 42

const user6 = {
	firstName: "Patrick Bateman!",
	getName() {
		const firstName = "Marla Singer!";
		return this.firstName;
	},
};
console.log(user6.getName()); // Patrick Bateman!

function makeUser() {
	return {
		name: "Raman Raghav",
		ref: this,
	};
}

let user7 = makeUser();

alert(user7.ref.name); // What's the result?
// Explaination: When makeUser() is called, 'this' inside it refers to the global object (in a browser environment, it's window). Inside makeUser(), an object is returned with a name property set to "Raman Raghav" and a ref property set to this.
// However, since this refers to the global object at the time makeUser() is called, user7.ref will also refer to the global object. The global object (window in a browser environment) doesn't have a name property, so accessing user7.ref.name results in undefined.

function makeUser() {
	return {
		name: "Patrick Bateman",
		ref() {
			return this;
		},
	};
}

let user8 = makeUser();
// When ref method is called as user8.ref(), 'this' inside the method refers to the object on which the method is called, which is user8. Therefore, this in user8.ref() refers to the object { name: "Patrick Bateman", ref: [Function: ref] }.
alert(user8.ref().name); // Patrick Bateman

//Problem 1:
const object1 = {
	message: "Hello, World!",

	getMessage() {
		const message = "Hello, Earth!";
		return this.message;
	},
};

console.log(object1.getMessage()); // Hello World

// Problem 2:
function Pet(name) {
	this.name = name;

	this.getName = () => this.name;
}

const cat = new Pet("Fluffy");

console.log(cat.getName()); // TypeError: cat.getName is not a function (undefined is not a function)

const { getName } = cat;
console.log(getName());
// Explaination: In the provided code, when Pet is used as a constructor function with the new keyword (const cat = new Pet("Fluffy");), the 'this' inside the Pet function indeed refers to the instance being created (cat in this case).
// However, since arrow functions lexically capture this from their surrounding context, when you define getName as an arrow function within the Pet constructor function, it captures this from the lexical scope of Pet, which is the global context in this case.
// Therefore, even though Pet is used as a constructor function and this inside Pet should refer to the instance being created, this inside the arrow function getName does not refer to the instance (cat). Instead, it refers to the global context (or undefined in strict mode).


//FIX:
function Pet1(name) {
    this.name = name;
    this.getName = function() {
        return this.name;
    };
}

const cat2 = new Pet("Fluffy");
console.log(cat2.getName()); // Output: Fluffy


//Problem 3:

const object3 = {
	message: "Hello, World!",

	logMessage() {
		console.log(this.message); 
	},
};
setTimeout(object3.logMessage, 1000); //undefinedß
Explaination: // setTimeout is a function that asynchronously executes a callback function after a specified delay (in milliseconds).
// When object3.logMessage is passed as the callback function to setTimeout, it's extracted from its object context.
// Therefore, when logMessage is executed by setTimeout, this inside logMessage no longer refers to object3. Instead, it refers to the global object (window in a browser environment) or undefined in strict mode.

//Problem 4:
const object4 = {
	message: "Hello, World!",
};

function logMessage() {
	console.log(this.message); // "Hello, World!"
}
// Write your code here...
// Solution: Creating a bound function
const boundLogMessage = logMessage.bind(object);
boundLogMessage();


//Problem 5:
const object5 = {
	who: "World",

	greet() {
		return `Hello, ${this.who}!`;
	},

	farewell: () => {
		return `Goodbye, ${this.who}!`;
	},
};

console.log(object5.greet()); // Hello, World
console.log(object5.farewell()); // Goodbye, undefined



//Problem 6:
var length = 4;
function callback() {
	console.log(this.length); // undefined
}

const object6 = {
	length: 5,
	method(callback) {
		callback();
	},
};

object6.method(callback, 1, 2);
// Explaination: When object6.method(callback) is called, it executes the method function within the context of object6.
// Inside method, callback is invoked without specifying a context (this value).
// Since callback is not invoked in a specific context, its this defaults to the global object (window in a browser environment, or global in Node.js), or undefined in strict mode.
// The global object (window) does not have a length property defined, hence this.length inside the callback function evaluates to undefined.
// FIX: 
var length1 = 4;

function callback1() {
  console.log(this.length1); // 5
}

const objectLen = {
  length: 5,
  method(callback) {
    callback.call(this); // Explicitly bind `this` to `object6`
  },
};

objectLen.method(callback1); // Output: 5

//Problem 7:

var length = 4;
function callback() {
	console.log(this.length); 
}

const object7 = {
	length: 5,
	method() {
		arguments[0]();
	},
};
// when callback is invoked inside method without a specified context, this.length inside callback refers to arguments.length, which is 3.
object7.method(callback, 1, 2); // 3

function User() {
	this.name = "John Doe";
	this.score = 20;
	this.sayUser = function () {
		// when `this` is accessible
		console.log(this.name);

		function innerFunction() {
			// when `this` refers to the global scope/object
			console.log(this.name);
		}

		innerFunction();
	};
}
let name1 = new User();
name1.sayUser();

Explaination:
// When name1.sayUser() is called, it executes sayUser within the context of name1.
// Inside sayUser, this refers to name1, so console.log(this.name) prints "John Doe".
// However, innerFunction has its own scope and this defaults to the global object.
// Since name is not defined globally, console.log(this.name) inside innerFunction prints undefined.






function User() {
	this.name = "John Doe";
	this.score = 20;
	this.sayUser = function () {
		// when `this` is accessible
		console.log(this.name);

		const innerFunction = () => {
			// when `this` refers to the global scope/object
			console.log(this.name);
		};

		innerFunction();
	};
}
let name5 = new User();
name5.sayUser();
Explaination:
// this.name inside 'sayUser' refers to the name property of the "User object" (name), so it prints "John Doe".
// Since innerFunction is an arrow function, this inside it refers to the surrounding lexical scope, which is sayUser.
// Therefore, this.name inside innerFunction still refers to the name property of the User object (name), so it also prints "John Doe".



// IIFE

// - In non-strict mode, when an IIFE is invoked, this inside the IIFE refers to the global object (window in a browser environment, or global in Node.js).

// - In strict mode, when an IIFE is invoked, this inside the IIFE is undefined.


(function () {
	console.log(this); // In non-strict mode, `this` refers to the global object (e.g., window in browsers)
})();

//   Using this in an Object Inside IIFE:
var obj101 = {
	name: "John",
	greet: (function () {
		console.log("Hello, " + this.name); // `this` refers to the global object, not `obj`
	})(),
};

obj101.greet() // greet is not a function 
Explaination:
// When the IIFE is invoked:
// It executes immediately when the object is created.
// Inside the IIFE, this refers to the global object because the function is invoked in the global scope.
// However, obj101 is not yet fully constructed when the IIFE is invoked, so this.name does not refer to obj101.name. Instead, this.name would be undefined or may throw an error if name is not defined globally.

var obj102 = {
	name: "John",
	greet: function () {
		console.log("Hello, " + this.name);
	}.bind(this), // Binding `this` to `obj`
};

obj102.greet() // Hello undefined
Explaination:
// When obj102.greet() is called, it invokes the greet function within the context of obj102.
// However, because of the use of .bind(this), this inside greet is explicitly bound to the global object, not to obj102.
// Therefore, this.name inside greet refers to the name property of the global object, which is likely undefined.



(function () {
	function Person(name) {
		this.name = name;
		console.log("Hello, " + this.name);
	}

	var person = new Person("John"); 
})(); // Hello John


// Immediately Invoked Function Expression (IIFE):
// The code is wrapped in an IIFE, creating a private scope for the code inside it.
// This prevents the variables and functions inside the function from polluting the global namespace.




(function () {
	function Person(name) {
		this.name = name;
		console.log("Hello, " + this.name);
	}

	var person = new Person("John");
}).call(this); // Hello John

// Even though this is bound to the global object within the IIFE, it doesn't affect the context in which this is accessed inside the Person constructor.




(function () {
	var button = document.getElementById("myButton");
	button.addEventListener("click", function () {
		console.log("Button clicked by", this); // `this` refers to the button element
	});
})();



(function () {
	var button = document.getElementById("myButton");
	button.addEventListener(
		"click",
		function () {
			console.log("Button clicked by", this);
		}.bind(this)
	); // Binding `this` to the global object
})();

(function () {
	setTimeout(() => {
		console.log(this); // `this` is lexically scoped, refers to the enclosing context (usually the global object)
	}, 1000);
})();

//Function constructor
function Person(name) {
	this.name = name;
}

Person.prototype.sayHello = function () {
	console.log("Hello, " + this.name);
};

var person1 = new Person("John");
person1.sayHello(); // Output: Hello, John

function MyClass() {
	this.someValue = 42;

	setTimeout(function () {
		console.log(this.someValue); // `this` inside setTimeout refers to the global object
	}, 1000);
}

var obj103 = new MyClass();
// Output (after 1 second): undefined

function MyClass() {
	this.someValue = 42;

	setTimeout(() => {
		console.log(this.someValue); // Using arrow function to preserve `this`
	}, 1000);
}

// this binding:

// 1.  New binding
// When a function is invoked with the new keyword, ‘this’ will reference the newly created object:
function Person(name, age) {
	this.name = name;
	this.age = age;
}

const person1 = new Person("Peter", 55);

// 2. Implicit binding
// When a function is invoked with the dot notation, ‘this’ will reference the object to the left of our dot:

const person = {
	name: "Thomas",
	age: 40,
	hi() {
		console.log("Hi, " + this.name);
	},
};
person.hi(); // Hi, Thomas

//3. Explicit binding:
let cat1 = {
	name: "Bob",
	age: 5,
	type: "Cat",
};

let animal = {
	animalInfo: function (food) {
		return `Our ${this.type}, ${this.name}, is ${this.age} years old. He likes to eat ${food}`;
	},
};

console.log(animal.animalInfo.call(cat1, "fish"));
// Our Cat, Bob, is 5 years old. He likes to eat fish
