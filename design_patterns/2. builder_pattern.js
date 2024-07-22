// Builder pattern (Creational design pattern)
// Creational design patterns focus on object creation mechanisms, tailoring the process to suit different situations. 
// They enhance flexibility and reusability in creating and initializing objects.
`
The Builder pattern is a creational design pattern that is used to construct complex objects step by step. 
It separates the construction of a complex object from its representation, allowing the same construction 
process to create different representations. This pattern is particularly useful when dealing with objects 
that have a large number of optional parameters or configurations.`;

`
What it does: The Builder Pattern is used to construct complex objects step by step, separating the 
  construction process from the object's representation.

What problem it solves: It's particularly useful when dealing with objects that have a large number 
  of optional parameters or configurations, making object creation more flexible and easier to understand.`

`Why it's important: It helps in constructing complex objects in a more organized and maintainable manner, 
  especially when dealing with objects with many optional parameters.

Why use it: It provides a clear and structured way to create objects, improving code readability and allowing 
  for easy modification of object construction logic.`

`
How it works: The Builder Pattern typically involves a builder class responsible for constructing 
  instances of a complex object.

How to implement it:`

//Without Builder Pattern
class Address {
	constructor(zip, street) {
		this.zip = zip;
		this.street = street;
	}
}

class User {
	constructor(name, age, phone, address) {
		this.name = name;
		this.age = age;
		this.phone = phone;
		this.address = address;
	}
}

const user1 = new User('Vikrant Singh Bandral');
const user2 = new User(
	'Vikrant Singh Bandral',
	undefined,
	undefined,
	new Address('1', 'Main Street')
);
console.log('user without builder', user1);
console.log('user1 without builder', user2);


// Approach 1:
class UserBuilder {
  constructor(name) {
    this.user = new User(name);
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }

  build() {
    return this.user;
  }
}

const user3 = new UserBuilder('Vikrant Bandral')
  .setAge(27)
  .setPhone('+91-9086000000')
  .build();

// In this approach:

`The UserBuilder class constructs instances of User.
Methods like setAge and setPhone are provided to set optional parameters.
The build method returns the fully constructed User object.`


// Approach 2:

class User2 {
  constructor(name, { age, phone, address } = {}) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user4 = new UserBuilder('Vikrant Bandral', {
  age: 27,
  phone: '+91-9086123000',
  address: new Address('1', 'Main Street'),
});

`In this approach:

The User2 constructor takes the user's name and an optional configuration object.
The configuration object can contain optional parameters like age, phone, and address.
Users can be created by passing the name and the configuration object with desired parameters.`

`Summary:
The Builder Pattern provides a structured way to construct complex objects by separating 
the construction process from the object's representation. It allows for easy creation of 
objects with many optional parameters or configurations, improving code readability and 
maintainability. Whether using a dedicated builder class or passing a configuration object, 
the Builder Pattern offers flexibility and clarity in object construction.`






