`
Object.assign is a built-in method in JavaScript used to copy the values of all enumerable 
own properties from one or more source objects to a target object. It returns the target object.

Here's how Object.assign works:
- Target Object: The first parameter is the target object where properties will be copied to.

- Source Objects: Subsequent parameters are source objects from which properties will be copied.

- Property Copying: The method copies all enumerable properties from the source objects to the 
target object. If a property with the same key exists in the target object, it will be 
overwritten by the property from the source object.
`
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);

console.log(result); // { a: 1, b: 3, c: 5, d: 6 }


if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    // Ensure the target is an object
    if (target == null) { // Checking for both undefined and null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    // Convert the target to an object, in case it's not an object type (e.g., string, number)
    let to = Object(target);

    // Iterate over the source objects
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      // If the source is null or undefined, skip to the next iteration
      if (source != null) { 
        // Use a for...in loop to iterate over all enumerable properties of the source
        for (let key in source) {
          // Check if the property is a direct property of the source (not inherited)
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key]; // Assign the property to the target object
          }
        }
      }
    }

    return to; // Return the modified target object
  };
}
