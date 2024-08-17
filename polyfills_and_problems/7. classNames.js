// classnames is a commonly-used utility in modern front end applications to conditionally join 
// CSS class names together. If you've written React applications, you likely have used a similar library.

// Implement the classnames function.

function classNames(...args) {
	let res = [];

	for (let i = 0; i < args.length; i++) {
		if (typeof args[i] === "string" && args[i].trim() !== "") {
			res.push(args[i]);
		} else if (typeof args[i] === "object") {
			for (let key in args[i]) {
				if (args[i].hasOwnProperty(key) && args[i][key]) {
					res.push(key);
				}
			}
		}
	}

	return res.join(" ");
}


// console.log(classNames("foo", "bar")); // 'foo bar'
console.log(classNames("foo", { bar: true })); // 'foo bar'
console.log(classNames({ "foo-bar": true })); // 'foo-bar'
console.log(classNames({ "foo-bar": false })); // ''
console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
