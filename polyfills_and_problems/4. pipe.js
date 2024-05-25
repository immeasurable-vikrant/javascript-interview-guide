// The concept of pipe is simple — it combines n functions. It’s a pipe flowing left-to-right, calling each function with the output of the last one.

//Unary Paramter
const add5 = (x) => x + 5;
const subtract10 = (x) => x - 10;
const multiplyBy3 = (x) => x * 3;

function pipeFunc(...funcs) {
  return function (arg) {
    return funcs.reduce((acc, func) => func(acc), arg);
  };
}
const pipe1 = pipeFunc(add5, subtract10, multiplyBy3);
console.log(pipe1(10)); // 5

function multiply(a, b) {
  return a * b;
}

function addThree(a, b, c) {
  return a + b + c;
}

function subtract(a, b) {
  return a - b;
}

function pipe2(...funcs) {
  return function (args, ...restArgs) {
    return funcs.reduce((acc, func) => func(acc, ...restArgs), args);
  };
}

const pipeFunct = pipe2(multiply, addThree, subtract);
console.log(pipeFunct(2, 3, 4));

// Important - It handles almost all arguments
function multiply(a, b) {
  return a * b;
}

function addThree(a, b, c) {
  return a + b + c;
}

function subtract(a, b) {
  return a - b;
}

function pipe2(...funcs) {
  return function (args, ...restArgs) {
    let result = funcs[0](args, ...restArgs);

    for (let i = 1; i <= funcs.length - 1; i++) {
      result = funcs[i](result, ...restArgs);
    }
    return result;
  };
}

const pipeFunction2 = pipe2(multiply, addThree, subtract);
console.log(pipeFunction2(2, 3, 4)); // Output: 10

// Important Problem: Asked in Flipkart SDE-1
const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

const pipe = (obj) => {
  return (...args) => {
    for (let key in obj) {
      let val = obj[key];
      if (typeof val === "function") {
        obj[key] = val(...args);
      } else {
        obj[key] = pipe(val)(...args);
      }
    }
    return obj;
  };
};

console.log(pipe(obj)(1, 1, 1));
