// Call

let person = {
    name: "Vikrant Singh Rajput",
    printAge: function(age){
        console.log(`${this.name} is ${age} years old`)
    }
}
person.printAge(28)

let person1 = {
    name: "Sushant Singh Rajput"
}


function printAge(age){
    console.log(`${this.name} is ${age} years old`)
}

printAge.call(person, 28)
printAge.call(person1, 34)



// CALL POLYFILL - The purpose of the call method is to invoke a function 
// with a specific this context and arguments.

// Define myCall function on the prototype of Function
`The context parameter is used to explicitly set the value of "this" when 
invoking the function. 
"this" refers to the function that myCall is being called on. 
`
Function.prototype.myCall = function(context = {}, ...args) {
    // Check if the caller is a function
    if (typeof this !== 'function') {
        throw new Error(this, 'it is not callable');
    }

    // By assigning the function to a property of an object (context), 
    // and then calling it as a method of that object, we can control 
    // what this refers to inside the function.
    context.func = this;

    // Execute the function with the provided context and arguments
    const result = context.func(...args);

    // After the function has been called, it is a good practice to 
    // clean up by deleting the temporary property func from context. 
    // This prevents any unintended side effects or memory leaks from 
    // leaving unnecessary properties on the context object.
    delete context.func;

    // Return the result of the function execution
    return result;
}

`- Memory Leakage: Each time myCall is used, a new property func is added to the 
    context object. If myCall is called repeatedly without deleting func, it will 
    lead to an accumulation of unused properties, causing unnecessary memory consumption.
- Property Conflicts: If context already has a property named func, calling myCall will 
    overwrite this property, potentially causing unintended behavior elsewhere 
    in the code that relies on the original property.
- Unintended Behavior: Leaving func in context may lead to confusion and unintended 
    behavior in other parts of the code that interact with context. It can introduce 
    unexpected function calls or errors if other code mistakenly relies on the presence
    or absence of func in context.`

// Call the printAge function with person as context and 28 as argument
printAge.myCall(person, 28);


// Define myApply function on the prototype of Function
Function.prototype.myApply = function(context = {}, argsArray = []) {
    // Check if the caller is a function
    if (typeof this !== 'function') {
        throw new Error(this, 'it is not callable');
    }

    // Check if argsArray is an array-like object
    if (!Array.isArray(argsArray)) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    // Assign the function to the context object
    context.func = this;

    // Execute the function with the provided context and arguments array
    const result = context.func(...argsArray);

    // Remove the function from the context object to avoid side effects
    delete context.func;

    // Return the result of the function execution
    return result;
}

// Example usage:
// Call the printAge function with person as context and [28] as arguments array
// printAge.myApply(person, [28]);


// Define myBind function on the prototype of Function
Function.prototype.myBind = function(context = {}, ...argsArray) {
    // Store a reference to the original function

    // Check if the caller is a function
    if (typeof this !== 'function') {
        throw new Error(this, "cannot be bound as it's not callable");
    }

    context.func = this
    // Return a new function that will bind the original function to the context
    return function(...newArgs) {
        // Execute the original function with the provided context and arguments
        const result = context.func(...argsArray, ...newArgs);

        // Return the result of the function execution
        return result;
    };
};

// Example usage:

function printAge1(age, year){
    console.log(`${this.name} is ${age} years old & born on ${year}`)
}

const bindPoly = printAge1.myBind(person, 75);
bindPoly(1999)


// Since the original function (referenced by this) isn't modified directly in the myBind method, there's no need to delete context.func afterward; deleting it is optional and could be considered for memory management or to prevent unintended interactions, but it's not strictly necessary in this simplified implementation.