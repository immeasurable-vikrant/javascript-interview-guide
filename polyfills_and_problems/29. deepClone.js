`Deep Cloning:
  Deep cloning, on the other hand, creates a completely independent copy of the original object and all of its nested objects. It recursively copies all nested structures.
  
  Example of Deep Cloning:`;

const originalObject2 = {
	prop1: 'value1',
	nestedObject: { prop2: 'value2' },
};

// Deep clone using JSON.parse and JSON.stringify
const deepClone = JSON.parse(JSON.stringify(originalObject2));

// Modify a property of the nested object in the clone
deepClone.nestedObject.prop2 = 'modifiedValue';

console.log(originalObject2.nestedObject.prop2); // Output: 'value2'
