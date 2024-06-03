`The task is to implement a function promiseMerge that takes multiple promises as 
arguments. When all promises resolve, it should merge their results into a single 
value based on their types. If any promise rejects or if there are type mismatches, 
the function should reject with an appropriate error message.

`;

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function findType(value) {
  if (Array.isArray(value)) {
    return "array";
  } else if (isPlainObject(value)) {
    return "object";
  } else {
    const type = typeof value;
    return ["number", "string", "boolean"].includes(type) ? type : "invalid";
  }
}

function promiseMerge(...promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return reject(new TypeError("invalid arguments"));
    }

    Promise.all(promises)
      .then((results) => {
        let response = null;
        const type = findType(results[0]);

        for (let i = 1; i < results.length; i++) {
          const currentItemType = findType(results[i]);
          if (currentItemType !== type) {
            return reject(new TypeError("invalid types"));
          }
        }

        if (type === "number" || type === "string") {
          response = results.reduce(
            (acc, current) => acc + current,
            type === "string" ? "" : 0
          );
        } else if (type === "array") {
          response = [].concat(...results);
        } else if (type === "object") {
          response = Object.assign({}, ...results);
        } else if (type === "boolean") {
          response = results.reduce((acc, current) => acc && current, true);
        } else {
          return reject(new TypeError("invalid type"));
        }

        return resolve(response);
      })
      .catch(reject);
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

promiseMerge(p1, p2, p3)
  .then((result) => console.log(result)) // Output: 6
  .catch((error) => console.error(error));

const p4 = Promise.resolve("Hello");
const p5 = Promise.resolve(" ");
const p6 = Promise.resolve("World");

promiseMerge(p4, p5, p6)
  .then((result) => console.log(result)) // Output: "Hello World"
  .catch((error) => console.error(error));
