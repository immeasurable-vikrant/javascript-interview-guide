// Factory Pattern (Creational Design Pattern)
// Creational design patterns focus on object creation mechanisms, tailoring the process to suit different situations. 
// They enhance flexibility and reusability in creating and initializing objects.
`
The Factory Pattern is another creational design pattern that provides an interface 
for creating objects in a superclass, but allows subclasses to alter the type of objects 
that will be created. It's used when there is a need to create objects without specifying 
the exact class of object that will be created until runtime.`


`
What it does: Provides an interface for creating objects, but allows subclasses to 
  alter the type of objects that will be created.

What problem it solves: It solves the problem of creating objects without specifying 
  the exact class of object that will be created until runtime, thus promoting loose coupling between classes.`

`Why it's important: It promotes loose coupling between classes, allowing for easier maintenance 
  and flexibility in object creation.

Why use it: It enables you to define a common interface for creating objects, 
  while allowing subclasses to provide their own implementation of object creation.`

`How it works: It typically involves a superclass with a factory method that returns objects of a subtype.
How to implement it: Below is an example of implementing the Factory Pattern in JavaScript:`


// Superclass
class Animal {
  makeSound() {
    throw new Error("This method must be overridden!");
  }
}

// Subclasses
class Dog extends Animal {
  makeSound() {
    return "Woof!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Meow!";
  }
}

// Factory
class AnimalFactory {
  createAnimal(type) {
    switch (type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      default:
        throw new Error("Invalid animal type!");
    }
  }
}

// Usage
const factory = new AnimalFactory();

const dog = factory.createAnimal("dog");
console.log(dog.makeSound()); // Output: "Woof!"

const cat = factory.createAnimal("cat");
console.log(cat.makeSound()); // Output: "Meow!"


`Explanation:
In the example above, Animal is the superclass which defines a common interface makeSound(), 
but it doesn't directly instantiate any objects.

Dog and Cat are subclasses of Animal, each providing their own implementation of the makeSound() method.

AnimalFactory is the factory class which has a method createAnimal(type) that returns objects 
of different types based on the type parameter passed.

When createAnimal() is called with a specific type, it creates and returns an object of 
that type, promoting loose coupling between the client code and the actual object creation process.

Summary:
The Factory Pattern provides an interface for creating objects in a superclass, allowing subclasses to 
alter the type of objects that will be created. It promotes loose coupling between classes and provides 
flexibility in object creation, making it easier to maintain and extend code. It's particularly useful 
in scenarios where the exact type of object needed may vary at runtime.`