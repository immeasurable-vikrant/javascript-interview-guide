// Detailed Example of Inheritance in JavaScript using Prototype Chain
// Let's consider a scenario where we have a base class Person, and we derive Employee and 
// Manager from it.

// Base constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
};

// Derived constructor function
function Employee(name, age, jobTitle) {
  Person.call(this, name, age); // Call the Person constructor
  this.jobTitle = jobTitle;
}

// Setting up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.describeJob = function () {
  return `I am a ${this.jobTitle}.`;
};

// Further derived constructor function
function Manager(name, age, jobTitle, department) {
  Employee.call(this, name, age, jobTitle); // Call the Employee constructor
  this.department = department;
}

// Setting up inheritance
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.describeDepartment = function () {
  return `I manage the ${this.department} department.`;
};

// Create instances
let person = new Person("Alice", 30);
let employee = new Employee("Bob", 25, "Software Engineer");
let manager = new Manager("Charlie", 40, "CTO", "Technology");

console.log(person.greet());
console.log(employee.greet());
console.log(employee.describeJob());
console.log(manager.greet());
console.log(manager.describeJob());
console.log(manager.describeDepartment());

// Questions Based on the Example
// Simple Questions
// What will be the output of person.greet() ?

console.log(person.greet());

// Answer: "Hello, my name is Alice and I am 30 years old."

// How do you call the Person constructor from within the Employee constructor ?
// Answer : Using Person.call(this, name, age);

// How is inheritance set up between Employee and Person ?
// Answer : By using Employee.prototype = Object.create(Person.prototype); and setting the constructor back with Employee.prototype.constructor = Employee;

// What method will employee.describeJob() call ?

// Answer : It will call the describeJob method defined on Employee.prototype.

// Complex Questions

// Explain how the prototype chain works when calling manager.greet().
// Answer: When manager.greet() is called, JavaScript will look for the greet method on the Manager prototype.Since it is not found there, it moves up the prototype chain to Employee.prototype, and not finding it there either, it moves up again to Person.prototype where the greet method is found and executed.This is because Manager inherits from Employee which in turn inherits from Person.

// If we add a new method to Person.prototype, will it be available to instances of Manager ? Illustrate with an example.
// Answer: Yes, it will be available.For example, if we add a new method sayGoodbye to Person.prototype:

Person.prototype.sayGoodbye = function () {
  return `${this.name} says goodbye.`;
};

console.log(manager.sayGoodbye());

// The output will be "Charlie says goodbye." because Manager instances inherit from Person through the prototype chain.

// What will be the result if we change Employee.prototype directly after creating an instance ? For example:

let newEmployee = new Employee("Diana", 28, "Product Manager");
Employee.prototype.greet = function () {
  return `Hi, I am ${this.name} and my job title is ${this.jobTitle}.`;
};
console.log(newEmployee.greet());
// Answer: The output will be "Hi, I am Diana and my job title is Product Manager." because the prototype chain is dynamic, and changes to the prototype are reflected in all instances that inherit from that prototype.

// How can you prevent modifications to the prototype of Person after its initial definition ?

//         Answer : You can use Object.freeze(Person.prototype); to prevent any modifications to Person.prototype:

Object.freeze(Person.prototype);
// Now, any attempts to modify Person.prototype will fail silently or throw an error in strict mode.
// These questions should help in understanding the nuances of prototype - based inheritance in JavaScript.
