// // Function composition is the process of chaining together multiple functions to form a new function. 
// It involves applying a series of transformations or operations to an input value, where the output of 
// one function becomes the input of the next function in the composition chain.

// // The compose function takes in two or more functions and returns a new function that applies these 
// functions in right-to-left order. This means that the rightmost function is applied first, followed by 
// the next function to its left, and so on.

//Unary Paramter
const add5 = (x) => x + 5;
const multiplyBy3 = (x) => x * 3;
const subtract10 = (x) => x - 10;

function composeFunc(fn1, fn2, fn3) {
	return function (a) {
		return fn1(fn2(fn3(a)));
	};
}
const composed = composeFunc(subtract10, multiplyBy3, add5);
console.log(composed(2)); // 11




//---------------------------------------------------------------------------------------

//Multiple Arguments


function multiply(a, b) {
	return a * b;
}

function addThree(a, b, c) {
	return a + b + c;
}

function subtract(a, b) {
	return a - b;
}

function compose(...funcs) {
	return function (args, ...restArgs) {
		return funcs.reduceRight((acc, func) => func(acc, ...restArgs), args);
	};
}

const composedFunction = compose(subtract, addThree, multiply);
console.log(composedFunction(2, 3, 4)); // Output: 10






//---------------------------------------------------------------------------------------




//Very Important Problem:
function square(a) {
	return a * a;
}
function add(a, b) {
	return a + b;
}

function compose3(...functions) {
	return (...args) => {
		let result = functions[functions.length - 1](...args);

		for (let i = functions.length - 2; i >= 0; i--) {
			result = functions[i](result); //here we are passing result of previous function into this one.
		}
		return result;
	};
}

const composedFunction3 = compose3(square, add);

console.log(composedFunction3(1, 2)); // Output: 9



//---------------------------------------------------------------------------------------





//V.Important - This solves almost all use cases
function multiply1(a, b) {
    return a * b;
}

function addThree1(a, b, c) {
    return a + b + c;
}

function subtract1(a, b) {
    return a - b;
}

function compose1(...funcs) {
    return function (args, ...restArgs) {
        let result = funcs[funcs.length - 1](args, ...restArgs)
        for (let i = funcs.length - 2; i >= 0; i--) {
            result = funcs[i](result, ...restArgs);
        }
        return result;
    };
}
const composedFunction1 = compose1(subtract, addThree, multiply);
console.log(composedFunction1(2, 3, 4)); // Output: 10



