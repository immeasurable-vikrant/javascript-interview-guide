// Singleton pattern (Creational design pattern)
// Creational design patterns focus on object creation mechanisms, tailoring the process to suit different situations. 
// They enhance flexibility and reusability in creating and initializing objects.
`
The Singleton Pattern is a creational design pattern that ensures a 
class has only one instance and provides a global point of access to that 
instance. It's used when exactly one object is needed to coordinate actions 
across the system, such as managing a shared resource or controlling a single 
point of access to a service.`


`
What it does: Ensures that a class has only one instance and provides a 
  global point of access to that instance.

What problem it solves: It solves the problem of having multiple instances of a 
  class when only one instance is needed, such as managing shared resources, database 
  connections, or configuration settings.`

`
Why it's important: It helps in scenarios where having multiple instances of a 
  class could lead to unexpected behavior or resource wastage.

Why use it: It provides a centralized control point, simplifies access to 
  shared resources, and ensures that the same instance is reused throughout the application.`

`
How it works: It typically involves a class with a method that either creates a 
  new instance or returns an existing one if it already exists.

How to implement it: Below is an example of implementing the Singleton Pattern in JavaScript:`

// Singleton Class definition
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      // This ensures only one instance is created
      Singleton.instance = this;
    }

    // Other initialization logic
    this.data = [];
    
    // Return the existing instance
    return Singleton.instance;
  }

  // Example method
  addData(item) {
    this.data.push(item);
  }

  // Example method
  getData() {
    return this.data;
  }
}

// Usage
const instance1 = new Singleton();
const instance2 = new Singleton();

// Both instance1 and instance2 refer to the same object
console.log(instance1 === instance2); // Output: true

instance1.addData('foo');
instance2.addData('bar');

console.log(instance1.getData()); // Output: ['foo', 'bar']
console.log(instance2.getData()); // Output: ['foo', 'bar']


`Explanation:

In the example above, the Singleton class's constructor checks if an instance already exists. 
If it doesn't, it creates one by assigning this to Singleton.instance. If an instance already exists, 
it returns the existing one.

addData() and getData() methods are just examples to demonstrate the usage of the singleton instance.

When new Singleton() is called multiple times, it returns the same instance every time,
 ensuring only one instance exists throughout the application.

Summary:
The Singleton Pattern is useful when you need to ensure that only one instance of a class 
exists and provide a global access point to that instance. It's important for managing 
shared resources, controlling access to services, or maintaining global state in an application. 
However, it should be used judiciously, as it can introduce global state which may make your code harder to 
test and maintain.
`





