`Shallow Cloning and Deep Cloning in JavaScript``Shallow Cloning:
Shallow cloning creates a new object and copies the values of the original object's properties to the new object. However, when the original object contains nested objects, a shallow clone only copies references to those nested objects, not the nested objects themselves.

Example of Shallow Cloning:`;

const originalObject1 = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};

`Shallow clone using Object.assign`;
const shallowClone = Object.assign({}, originalObject1);
`Modify a property of the nested object in the clone`;
shallowClone.nestedObject.prop2 = "modifiedValue";
console.log(originalObject1.nestedObject.prop2); // Output: 'modifiedValue'

`Deep Cloning:
  Deep cloning, on the other hand, creates a completely independent copy of the original object and all of its nested objects. It recursively copies all nested structures.
  
  Example of Deep Cloning:`;

const originalObject2 = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};

// Deep clone using JSON.parse and JSON.stringify
const deepClone = JSON.parse(JSON.stringify(originalObject2));

// Modify a property of the nested object in the clone
deepClone.nestedObject.prop2 = "modifiedValue";

console.log(originalObject2.nestedObject.prop2); // Output: 'value2'

`Circular References and Cloning:

A circular reference occurs when an object references itself directly or indirectly through a 
chain of references. Cloning objects with circular references can lead to infinite loops if not 
handled properly.. Circular references can pose challenges when cloning objects, particularly when 
dealing with shallow and deep cloning.

Shallow cloning: creates a new object but does not create copies of nested objects. Instead, it 
copies references to the nested objects. If there are circular references, a shallow copy will 
not handle them well because it will end up copying the references in a way that maintains the 
circular structure. If a nested object contains a circular reference, the shallow clone will still 
reference the same nested object.

Example of Circular Reference:`;

const circularObject = {
  prop: "value",
};
circularObject.circularRef = circularObject;

// Trying to JSON.stringify a circular reference will throw an error
// JSON.parse(JSON.stringify(circularObject)); // Error - Converting circular structure to JSON

//Shallow Circular refernce Example:
const original = {
  prop1: "value1",
  circularRef: null,
};

original.circularRef = original;

const shallowClone = Object.assign({}, original);

console.log(shallowClone.circularRef === original.circularRef); // true (still references the same object)

// Deep Circular refrence Example:
// However, when circular references are present, traditional deep cloning methods can result in infinite loops or stack overflows.
const original = {
  prop1: "value1",
  circularRef: null,
};

original.circularRef = original;

// This will throw an error due to the circular reference
const deepClone = JSON.parse(JSON.stringify(original));

let obj = {
  name: "hello",
  age: 28,
  full: {
    first: "hey",
    last: "yeh!",
  },
  getFull: function () {
    console.log(this.name);
  },
};

let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);
// Output: { name: 'hello', age: 28, full: { first: 'hey', last: 'yeh!' } }
console.log(typeof newObj.getFull);
// Output: undefined
`
Loss of Methods and Non-Serializable Properties:
	- Methods (functions) in the object are not included in the clone.
	- Non-serializable properties like undefined, Symbol, and functions are omitted.

Handling of Special Data Types:

	- Date objects are converted to strings. They will not be restored as Date instances in the clone.
	- Custom objects (those with custom prototypes) lose their class/type information and 
		are converted to plain objects.
	- NaN, Infinity, and -Infinity are converted to null.

Circular References:
	- JSON cannot handle objects that reference themselves. Attempting to
	stringify such an object will throw a TypeError.`;

// In the above example, using JSON.stringify and JSON.parse for deep cloning fails because it cannot handle circular references. Lodash's cloneDeep method helps in solving this issue.

/*
  Implementation of Cloning (Shallow and Deep):
  Shallow Clone Implementation:
  */

function shallowClone(obj) {
  return Object.assign({}, obj);
}

const originalObject3 = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};

const shallowCloneObject = shallowClone(originalObject3);

// Deep Clone Implementation:
function deepClone(obj, clonedObjects = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return non-objects as is
  }

  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj); // If object is already cloned, return the cloned version
  }

  const clone = Array.isArray(obj) ? [] : {};

  clonedObjects.set(obj, clone);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], clonedObjects);
    }
  }

  return clone;
}

const originalObject4 = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};

const deepCloneObject = deepClone(originalObject4);

// Note: The WeakMap in the deepClone function is used to keep track of objects that have been cloned to handle circular references and prevent infinite loops. The example implementation is simplified and may not cover all edge cases. There are also libraries like Lodash that provide cloning functions with more features and options.

// There are multiple ways to perform shallow and deep cloning in JavaScript. Here, I'll provide examples using different methods for both types of cloning:

// Shallow Cloning:

// Object.assign:
// Copies the values of all enumerable own properties from one or more source objects to a target object.

const originalObject5 = { prop1: "value1", nestedObject: { prop2: "value2" } };
const shallowClone = Object.assign({}, originalObject5);

// Spread Operator (...):
// Creates a new object and copies the enumerable own properties of the source object.
const originalObject6 = { name: "John", age: 30 };
const shallowCopy1 = { ...originalObject6 };

// Array.slice() (for arrays):
// Creates a shallow copy of an array.
const originalArray7 = [1, 2, 3];
const shallowCopy2 = originalArray7.slice();

// Deep Copy:
// JSON.stringify() and JSON.parse():

// Converts the object to a JSON string and then parses the string to create a new object. This method is suitable for simple objects without functions or circular references.
// Deep copy using JSON.stringify and JSON.parse cannot handle circular references.
const originalObject8 = { name: "John", age: 30 };
const deepCopy = JSON.parse(JSON.stringify(originalObject8));

// Lodash's cloneDeep():

// A utility library like Lodash provides a dedicated method for deep cloning, handling circular references and various edge cases.
const _ = require("lodash");
const originalObject9 = { name: "John", age: 30 };
const deepCopy1 = _.cloneDeep(originalObject9);

// The Object.assign() static method copies all enumerable own properties
// from one or more source objects to a target object. It returns the modified target object.

// function shallowClone1(obj) {
//   return Object.assign({}, obj)
// }

function deepClone(obj, visited = new map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], visited);
    }
  }
  return clone;
}
