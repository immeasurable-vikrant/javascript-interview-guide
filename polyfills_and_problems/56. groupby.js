const cars = [
  {
    make: "Audi",
    model: "R8",
    year: "2012",
  },
  {
    make: "Audi",
    model: "RS5",
    year: "2013",
  },
  {
    make: "Ford",
    model: "Mustang",
    year: "2012",
  },
  {
    make: "Ford",
    model: "Fusion",
    year: "2015",
  },
  {
    make: "Kia",
    model: "Optima",
    year: "2012",
  },
];

function grouping(cars) {
  return cars.reduce((acc, curr) => {
    const key = curr.make;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
}

console.log("grouping", grouping(cars)); // corrected the typo in console.log

// Here's a polyfill for the groupBy function in JavaScript:
function groupBy(array, fn) {
  // Using the reduce method to iterate over the array and accumulate the result
  return array.reduce((acc, curr) => {
    // Applying the provided function to each item to determine the grouping key
    const key = fn(curr);

    // Checking if the key already exists in the accumulator object
    if (!acc[key]) {
      // If the key doesn't exist, create an empty array for it in the accumulator
      acc[key] = [];
    }

    // Pushing the current item to the array corresponding to its key
    acc[key].push(curr);

    // Returning the updated accumulator for the next iteration
    return acc;
  }, {});
}

// Example 1
const array1 = [{ id: "1" }, { id: "1" }, { id: "2" }];
const fn1 = function (item) {
  return item.id;
};
console.log(groupBy(array1, fn1));

// Example 2
const array2 = [
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9],
];
const fn2 = function (list) {
  return String(list[0]);
};
console.log(groupBy(array2, fn2));

// Example 3
const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const fn3 = function (n) {
  return String(n > 5);
};
console.log(groupBy(array3, fn3));




