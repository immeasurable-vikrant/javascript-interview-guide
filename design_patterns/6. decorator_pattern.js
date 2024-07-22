// Decorator Design Pattern (Structural Design Pattern)
// Structural design patterns focus on how objects and classes are composed to form larger structures. 
// They aim to ease the design by identifying simple ways to realize relationships among entities, 
// enhancing flexibility and efficiency in the system's architecture.
`What:
        The Decorator pattern allows behavior to be added to individual objects, dynamically, 
        without affecting the behavior of other objects from the same class. It wraps an object 
        with additional functionality.

Why:
        The Decorator pattern is useful when you want to add responsibilities to objects without 
        modifying the class. It provides a flexible alternative to subclassing for extending functionality.

Example:
        Imagine you have a Coffee class and you want to add different types of toppings (like milk or sugar) 
        without changing the Coffee class.`;

// Basic Coffee class
class Coffee {
  cost() {
    return 5;
  }

  description() {
    return "Coffee";
  }
}

// Decorator base class
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// Milk decorator
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ", Milk";
  }
}

// Sugar decorator
class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ", Sugar";
  }
}

// Usage
let myCoffee = new Coffee();
console.log(myCoffee.description(), ": $", myCoffee.cost()); // Coffee : $ 5

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description(), ": $", myCoffee.cost()); // Coffee, Milk : $ 7

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description(), ": $", myCoffee.cost()); // Coffee, Milk, Sugar : $ 8
