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
class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.available = true;
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
        this.poolArray[i].available = false;
        return this.poolArray[i];
      }
    }
    // Optionally handle case where no free resources are available
  }

  // Releases an element back to the pool
  releaseElement(element) {
    element.available = true;
    this.resetFunction(element.data);
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

// Duration-based Resource Pool

class ResourcePoolMember {
  constructor(data) {
    this.data = data;
    this.time = 0;
  }
}

const DURATION = 3000;

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
    element.time = 0;
    this.resetFunction(element.data);
  }
}

// Testing the Duration-based Resource Pool
const creatorFun1 = () => ({ counter: 0 });
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

`Explanation and Algorithm
Initialization:

The ResourcePool is initialized with a creator function, a reset function, and a 
  specified size. This initializes the pool with resources created using the creatorFunc 
  and reset using the resetFunction.

Creating Elements:
  createElement() method uses the creatorFunc and resetFunction to create a new 
  ResourcePoolMember.

Getting Elements:

Flag-based: The getElement() method iterates over the pool to find an available 
  resource, marks it as unavailable, and returns it.
Duration-based: The getElement() method checks each resource's timestamp. If the 
  duration since last allocation exceeds a predefined threshold, it resets and returns 
  the resource.

Releasing Elements:
  releaseElement() method resets the resource using the resetFunction and updates its 
  state (availability flag or timestamp).
  By following this approach, the resource pool efficiently manages reusable resources, 
  improving performance and resource utilization in scenarios where objects are frequently 
  created and destroyed.

`;
