//A deep map function in JavaScript recursively transforms values in nested objects and arrays. Here's an example implementation:
const deepMap = (obj, transformCallback) => {
    // If the object is an array, map over each element
	if (Array.isArray(obj)) {
		return obj.map((ob) => {
			return deepMap(ob, transformCallback);
		});
	} else if (typeof obj === 'object' && obj !== null) {
        // If the object is an object (but not null), map over each property
		let result = [];
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				result[key] = deepMap(obj[key], transformCallback);
			}
		}
		return result;
	} else {
        // Base case: apply the transformation to non-object, non-array values
		return transformCallback(obj);
	}
};

const objectInput = {
	a: 1,
	b: [2, 3, { c: 4, d: [5, 6] }],
	e: { f: 7, g: [8, 9] },
};

const transformFunc = (value) => value * 2

const deeplyMaped = deepMap(objectInput, transformFunc);

console.log(deeplyMaped);
