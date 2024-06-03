`
Problem Statement
  You are tasked with implementing a resource pool in JavaScript that manages reusable 
  objects efficiently. The resource pool must support two types of allocation strategies:

  Flag-based Allocation: Where each resource has an availability flag to determine if it 
  is free or in use.

  Duration-based Allocation: Where each resource has a timestamp, and resources are 
  reset and reused based on a specified duration.

  Your solution should involve creating and resetting resources using provided functions, 
  managing their state within the pool, and ensuring that resources are reused efficiently 
  according to the selected strategy.

  Resource Pool
    A resource pool is a design pattern that manages a set of reusable objects. 
    Instead of creating and destroying objects on demand, a resource pool keeps a 
    collection of initialized objects ready for use, improving performance and reducing 
    the overhead of frequent object creation and destruction.

  Flag-based Allocation
    In this strategy, each resource in the pool has a flag indicating whether it is 
    available for use. When a resource is requested, the pool checks the flags to 
    find an available resource. Once used, the resource is marked as unavailable and 
    returned to the pool when no longer needed.

  Duration-based Allocation
    In this strategy, each resource has a timestamp indicating the last time it was 
    allocated. When a resource is requested, the pool checks the timestamps to see if the 
    resource has exceeded a specified duration. If it has, the resource is reset and reused.

  Creator Function
    This function is responsible for creating new resources for the pool.

  Reset Function
    This function resets a resource to its initial state, making it ready for reuse.

`;
// Flag-based Resource Pool

// ResourcePoolMember class representing the resource and its availability
//  a "resource" refers to an object or entity that the resource pool manages and provides for reuse.
class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.available = true; // Availability flag
  }
}
class ResourcePool {
  poolArray = null;

  // Default declarations; will be provided externally
  creatorFunc = () => {};
  resetFunction = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  // Creates a fresh instance and resets it for safer side
  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  // Returns a free resource from the pool
  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      if (this.poolArray[i].available) {
        this.poolArray[i].available = false; // Marking as unavailable
        return this.poolArray[i];
      }
    }
    // Optionally handle case where no free resources are available
  }

  // Releases an element back to the pool
  releaseElement(element) {
    element.available = true; // Marking as available
    this.resetFunction(element.data); // Resetting resource state
  }
}

// Testing the Flag-based Resource Pool
const creatorFunc = () => ({ counter: 0 });
const resetFunc = (coolThing) => {
  coolThing.counter = 0;
  delete coolThing.name;
  return coolThing;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 1);
const objectThatIsReadyToUse = myPool.getElement();

console.log(objectThatIsReadyToUse);
// { available: false, data: { counter: 0 } }

// Doing stuff with the resource
objectThatIsReadyToUse.data.counter++;
objectThatIsReadyToUse.data.name = "Prashant";

console.log(objectThatIsReadyToUse);
// { available: false, data: { counter: 1, name: "Prashant" } }

myPool.releaseElement(objectThatIsReadyToUse);

console.log(objectThatIsReadyToUse);
// { available: true, data: { counter: 0 } }

` Feature Flag Algorithm: ALGORITHMS:

  - Define Feature Flags: Determine the features you want to control using feature flags. Each feature will 
  have its own flag.

  - Flag Storage: Decide how and where you'll store the feature flags. This could be in a database, 
  configuration file, or a key-value store.

  - Initialize Flags: Load the feature flags from the storage when your application starts.

    Check Flag Status:
  - When a feature is accessed in the code, check its corresponding flag to determine whether 
    it's enabled or disabled.
  - If the flag is enabled, allow access to the feature.
  - If the flag is disabled, handle the feature accordingly (e.g., show an alternative or 
    disabled functionality).
  - Update Flags Dynamically: Implement a mechanism to update feature flags dynamically 
  without restarting the application. This could involve periodic polling of the flag 
  storage or listening for updates via a messaging system.

  - Logging and Monitoring: Implement logging and monitoring to track feature usage and 
  flag changes. This helps in understanding the impact of feature flags on your application and enables better decision-making.
`;
// DURATION BASED:
// Duration-based Resource Pool

// ResourcePoolMember class representing the resource and its timestamp
class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.time = 0; // Timestamp
  }
}

const DURATION = 3000; // Duration threshold

class ResourcePool {
  poolArray = null;
  resetFunction = () => {};
  creatorFunc = () => {};

  constructor(creatorFunc, resetFunction = (any) => any, size = 1000) {
    this.resetFunction = resetFunction;
    this.creatorFunc = creatorFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  createElement() {
    const data = this.resetFunction(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      // Check if the resource allocation duration has expired
      if (Date.now() - this.poolArray[i].time > DURATION) {
        // Release the element
        this.releaseElement(this.poolArray[i]);
        // Assign the current time
        this.poolArray[i].time = Date.now();
        // Return it
        return this.poolArray[i];
      }
    }
    // Optionally handle case where no expired resources are available
  }

  releaseElement(element) {
    element.time = 0; // Resetting timestamp
    this.resetFunction(element.data); // Resetting resource state
  }
}

// Testing the Duration-based Resource Pool
const creatorFunc1 = () => ({ counter: 0 });
const resetFunc1 = (coolThing) => {
  coolThing.counter = 0;
  return coolThing;
};

const myPool1 = new ResourcePool(creatorFunc1, resetFunc1, 10);
const objectThatIsReadyToUse1 = myPool1.getElement();

objectThatIsReadyToUse1.data.counter++;
console.log(objectThatIsReadyToUse1);
// { data: { counter: 1 }, time: 1710445681593 }

setTimeout(() => {
  const objectThatIsReadyToUse2 = myPool.getElement();

  console.log(objectThatIsReadyToUse === objectThatIsReadyToUse2); // true
  console.log(objectThatIsReadyToUse2);
  // { data: { counter: 0 }, time: 1710445685157 }
}, 3500);

`
Duration-Based Flag Algorithm:

    - Define Duration Flags: Determine the features or behaviors you want to control based on a duration. 
    Each duration-based flag will have its own configuration, specifying the start and end time.

    - Flag Storage: Decide how and where you'll store the duration-based flag configurations. Similar to 
    feature flags, this could be in a database, configuration file, or a key-value store.

    - Initialize Flags: Load the duration-based flag configurations from the storage when your application starts.

    - Check Flag Status:

    - When a behavior controlled by a duration-based flag is accessed in the code, check the current time 
    against the start and end time specified in the flag configuration.
    - If the current time is within the duration specified by the flag, allow access to the behavior.
    - If the current time is outside the duration, handle the behavior accordingly (e.g., show an 
      alternative or disabled functionality).
    - Update Flags Dynamically: Implement a mechanism to update duration-based flag configurations 
    dynamically without restarting the application. This could involve periodic polling of the flag 
    storage or listening for updates via a messaging system.

    - Logging and Monitoring: Implement logging and monitoring to track the activation and deactivation 
    of duration-based flags. This helps in understanding when behaviors are enabled or disabled based on 
    the configured durations.
`;
