`Event Emitter:
  What: EventEmitter is a design pattern commonly used in event-driven programming. 
    It facilitates communication between objects in a system by allowing objects to 
    subscribe to events and be notified when those events occur.

  Why: EventEmitter is useful for decoupling components in a system. Instead of objects 
    having direct references to each other and calling methods on those objects, they can 
    communicate through events. This promotes loose coupling and makes the system more 
    modular and easier to maintain.
`

class EventEmitter {
  constructor() {
    // Initialize an object to store event listeners
    this.events = {};
  }

  // Method to subscribe to events
  on(event, listener) {
    // If the event doesn't exist in the events object, create it
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // Push the listener function to the array for that event
    this.events[event].push(listener);
  }

  // Method to emit events
  emit(event, ...args) {
    // If the event doesn't exist in the events object, return
    if (!this.events[event]) {
      return;
    }
    // Call each listener function with provided arguments
    this.events[event].forEach(listener => listener(...args));
  }

  // Method to unsubscribe from events
  off(event, listener) {
    // If the event doesn't exist in the events object, return
    if (!this.events[event]) {
      return;
    }
    // Filter out the listener function from the array for that event
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
}

// Example usage:
const emitter = new EventEmitter();

// Subscribe to 'message' event
emitter.on('message', (data) => {
  console.log('Message received:', data);
});

// Emit 'message' event
emitter.emit('message', 'Hello, world!'); // Output: Message received: Hello, world!

// Unsubscribe from 'message' event
const listener = (data) => {
  console.log('Another message received:', data);
};
emitter.on('message', listener); // Subscribe to 'message' event again
emitter.off('message', listener); // Unsubscribe from 'message' event
emitter.emit('message', 'Goodbye, world!'); // No output, as the listener is unsubscribed

`
Usage:

- Node.js: EventEmitter is a core module in Node.js and is extensively used for handling 
  asynchronous events.
- Browser Development: In browser development, EventEmitter-like patterns are used for 
  handling DOM events, such as click, hover, and submit events.
 - Custom Events: EventEmitter can be used to define and emit custom events within an 
  application or library, allowing different parts of the application to communicate without tight coupling.

Use Cases and Advantages:
Where to Use EventEmitter:
- User interfaces: Handling user interactions and DOM events.
- Network programming: Handling events like incoming data, connection established, etc.
- Asynchronous programming: Managing callbacks and events in asynchronous code.
- Custom event handling: Implementing custom event-driven logic within applications.

Advantages of EventEmitter:
- Simplified event handling: Provides a simple and intuitive way to handle events and 
    asynchronous operations.
- Decoupling of components: Promotes loose coupling between different parts of a 
    program by allowing them to communicate through events without direct dependencies.
- Scalability: Facilitates scalable and maintainable code by organizing asynchronous 
    and event-driven logic in a structured manner.`



  