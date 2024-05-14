`PubSub/ Event Emitter Asked in Microsoft Interview`


`
  The problem involves creating a Pub/Sub (Publish-Subscribe) system or an Event Emitter in 
  JavaScript, which is a common design pattern used to handle asynchronous events. This pattern 
  is useful in decoupling the parts of a program that produce events (publishers) from the parts 
  that respond to them (subscribers). The Pub/Sub pattern is frequently used in scenarios where 
  multiple components need to communicate without tight coupling.

  Concept and Design Pattern
  Pub/Sub (Publish-Subscribe) Pattern:

  Publisher: The entity that sends out events.

  Subscriber: The entity that listens for and handles events.

  Event Channel: The medium through which events are transmitted from publishers 
  to subscribers.

  The pattern provides an interface where:
  - Subscribers can register interest in certain types of events and provide callback 
  functions to be executed when such events occur.
  - Publishers can emit events, triggering all subscribed callbacks.


  Event Emitter:
  This is a more generalized form of the Pub/Sub pattern. It allows for:

  - Subscribing to events (subscribe).
  - Subscribing to events only once (subscribeOnce and subscribeOnceAsync).
  - Publishing events (publish).
  - Publishing events to all subscribers (publishAll).`

  class Events {
    constructor() {
      // Maps to store subscribers for different event types
      this.subscriptionList = new Map();
      this.subscribeOnceList = new Map();
      this.subscribeOnceAsyncList = new Map();
    }
  
    // Method to subscribe to an event
    subscribe(name, callback) {
      // Add callback to the subscription list for the event name
      if (!this.subscriptionList.has(name)) {
        this.subscriptionList.set(name, [callback]);
      } else {
        const existingCallbacks = this.subscriptionList.get(name);
        this.subscriptionList.set(name, [...existingCallbacks, callback]);
      }
  
      // Return an object with a remove method to unsubscribe
      return {
        remove: () => {
          const existingCallbacks = this.subscriptionList.get(name);
          const filtered = existingCallbacks.filter((e) => e !== callback);
          this.subscriptionList.set(name, filtered);
        },
      };
    }
  
    // Method to subscribe to an event only once
    subscribeOnce(name, callback) {
      // Add callback to the subscribe-once list for the event name
      if (!this.subscribeOnceList.has(name)) {
        this.subscribeOnceList.set(name, [callback]);
      } else {
        const existingCallbacks = this.subscribeOnceList.get(name);
        this.subscribeOnceList.set(name, [...existingCallbacks, callback]);
      }
    }
  
    // Method to subscribe to an event only once asynchronously
    async subscribeOnceAsync(name) {
      // Return a promise that resolves when the event is published
      return new Promise((resolve, reject) => {
        if (!this.subscribeOnceAsyncList.has(name)) {
          this.subscribeOnceAsyncList.set(name, [resolve]);
        } else {
          const existingCallbacks = this.subscribeOnceAsyncList.get(name);
          this.subscribeOnceAsyncList.set(name, [...existingCallbacks, resolve]);
        }
      });
    }
  
    // Method to publish an event
    publish(name, data) {
      // Invoke all callbacks in the subscription list for the event name
      const callbacks = this.subscriptionList.get(name) || [];
      callbacks.forEach((cb) => {
        cb(data);
      });
  
      // Invoke all callbacks in the subscribe-once list and clear them
      const subscribeOnceCallbacks = this.subscribeOnceList.get(name) || [];
      subscribeOnceCallbacks.forEach((cb) => {
        cb(data);
      });
      this.subscribeOnceList.set(name, []);
  
      // Invoke all async callbacks in the subscribe-once-async list and clear them
      const subscribeOnceAsyncCallbacks = this.subscribeOnceAsyncList.get(name) || [];
      subscribeOnceAsyncCallbacks.forEach((cb) => {
        cb(data);
      });
      this.subscribeOnceAsyncList.set(name, []);
    }
  
    // Method to publish data to all events
    publishAll(data) {
      // Iterate over all events and invoke all callbacks with the data
      for (const [key, value] of this.subscriptionList.entries()) {
        value.forEach((cb) => {
          cb(data);
        });
      }
    }
  }
  
  // Example usage
  const events = new Events();
  
  console.log("Hello");
  
  events.subscribeOnceAsync("new-user").then(function (payload) {
    console.log(`I am invoked once ${payload}`);
  });
  
  events.publish("new-user", "Foo Once Async");



`Key Points:

Subscription Management:
- subscriptionList holds persistent subscriptions.
- subscribeOnceList holds one-time subscriptions.
- subscribeOnceAsyncList holds one-time subscriptions resolved asynchronously.

Subscription Methods:
- subscribe(name, callback): Adds a callback to the list for the event.
- subscribeOnce(name, callback): Adds a callback to be called only once.
- subscribeOnceAsync(name): Adds a callback to be called once, returning a promise.

Publishing Methods:
- publish(name, data): Triggers callbacks for the event, including one-time callbacks.
- publishAll(data): Triggers all callbacks for all events.
`