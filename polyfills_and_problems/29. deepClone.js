`
Deep Cloning Polyfill and Concepts:

  Deep cloning, on the other hand, creates a completely independent copy of the original object 
  and all of its nested objects. It recursively copies all nested structures.
  
  Example of Deep Cloning:`;

const originalObj = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};

// Deep clone using JSON.parse and JSON.stringify
const deepClonedObject = JSON.parse(JSON.stringify(originalObj));

// Modify a property of the nested object in the clone
deepClonedObject.nestedObject.prop2 = "modifiedValue";
console.log(deepClonedObject.nestedObject.prop2); // Output: 'modifiedValue'

console.log(originalObj); // Output: { prop1: 'value1', nestedObject: { prop2: 'value2' } }
console.log(deepClonedObject); // Output: { prop1: 'value1', nestedObject: { prop2: 'modifiedValue' } }

`Deep Clone/Copy Polyfill:`;

const deepClonePolyfill = (obj, visited = new WeakMap()) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};
  visited.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClonePolyfill(obj[key], visited);
    }
  }
  return clone;
};

const originalObject = {
  prop1: "value1",
  nestedObject: { prop2: "value2" },
};
// // // Introduce circular reference
originalObject.circularRef = originalObject;

const clonedObject = deepClonePolyfill(originalObject);

clonedObject.nestedObject.prop2 = "Vikrant!";

console.log(originalObject);
console.log(clonedObject);

`
  Algorithm for Deep Clone Polyfill:
  
  - The function deepClonePolyfill takes an object obj as input along with an optional visited parameter, 
  which is initialized as a WeakMap. The visited WeakMap keeps track of visited objects to avoid circular 
  references.

  - The function checks if the input obj is either null or not an object. If so, it returns the 
  object itself because primitive values like null, strings, numbers, etc., do not need to be cloned.

  - It checks if the visited WeakMap already contains the obj. If it does, it means the object
  has already been cloned, so it returns the cloned object from the visited map.

  - If the obj is not null, not a primitive, and not yet visited, the function proceeds to clone it. 
  It initializes an empty array or object (clone) based on whether the obj is an array or a plain object.

  - It then sets the mapping between the original obj and its clone in the visited WeakMap to 
  keep track of it.

  - Next, it iterates over all own enumerable properties of the obj using a for...in loop.

  - For each property, it recursively calls deepClonePolyfill on the property value and 
  assigns the cloned value to the corresponding property in the clone. Finally, it returns the 
cloned object.
`;
