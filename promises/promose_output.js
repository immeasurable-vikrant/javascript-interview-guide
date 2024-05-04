`Problem 1:`;
function init() {
	throw new Error('I am an error');
	return Promise.resolve(1);
}

init()
	.then((v) => console.log(v + 1))
	.catch((err) => console.log('Error caught -- ', err));

// Option 3 would be the right answer because errors are caught by the catch block only when there are part of the promise chain. In the current code snippet, error thrown at line no. 2 is outside the promise chain as the chain is initiated at line no 3.

`Problem 2:`;
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

// Output: 1 7 3 5 2 6 4.

// Let us understand why:

// console.log(1) executes immediately and it outputs 1.
// setTimeout(() => console.log(2)); schedules a callback to the macrotask queue.
// Promise.resolve().then(() => console.log(3)); schedules a callback to the microtask queue.
// Promise.resolve().then(() => setTimeout(() => console.log(4))); schedules a callback to the microtask queue.
// Promise.resolve().then(() => console.log(5)); schedules a callback to the microtask queue.
// setTimeout(() => console.log(6)); schedules a callback to the macrotask queue.
// console.log(7); executes immediately and it outputs 7.
// So far, we have 1 7 as output. Now,

// Since microtasks takes precedence over macrotasks.

// The callback scheduled via line no. 3 (console.log(3);) executes and is printed to console.

// Output so far: 1 7 3
// The callback scheduled via line no. 4 executes and sets a new macrotasks as setTimeout callbacks are added macrotasks queue.

// The callback schedules via line no. 5 executes and is printed to console.

// Output so far 1 7 3 5
// Now, comes the turn of macrotasks as all the microtasks are over.

// The callback scheduled via line no. 2, 6, 4 are executed in order and printed to console.

// Final output 1 7 3 5 2 6 4

`Problem 3:`;
function processing() {
	return Promise.reject('Something went wrong!');
}

function init() {
	try {
		return processing();
	} catch (err) {
		console.log('Error in processing.');
	}
}

init().then(() => {
	console.log('End');
});

//  Output:
//  Uncaught (in promise) Something went wrong!

//  In function processing our error is async in nature. Traditional try/catch blocks doesn't catch async errors in the promise chain because of their sync nature. You might say they work in case of async/await syntax. Yes, they work because when we are using await keyword then we are kind of suspending the execution of the function till promised is resolved so it behaves in a sync manner

`Problem 4:`;

function processing() {
	return new Promise((resolve, reject) => {
		resolve(1);
		reject('Failed');
		resolve(2);
		console.log('After resolve/reject');
	});
}

function init() {
	processing()
		.then((v) => console.log(v + 1))
		.catch((err) => console.log(err));
}

init();

// Output:
// After resolve/reject
// 2

// resolve and reject doesn't work like return. Even if they are called, the function completes its execution. Hence, console.log will be called even though resolve/reject is already invoked before and .then callback will be called after that. Yes, resolve/reject will be called once as per order of invocation.

`Peoblebm 5:`;
function processing() {
	return new Promise((resolve, reject) => {
		resolve(1);
		reject('Failed');
		resolve(2);
	});
}

function init() {
	processing()
		.then((v) => console.log(v + 1))
		.catch((err) => console.log(err));
}

init();
//   Output:
//   // 2
//   2 because the resolve or reject only execute once in the order they are called. No matter if there is a reject after resolve or vice versa it won't be executed.
