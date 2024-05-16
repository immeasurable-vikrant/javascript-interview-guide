`
A JSON serializer is a tool or function that converts a JavaScript value (such as an object, 
    array, string, number, boolean, or null) into a JSON string. 
    JSON (JavaScript Object Notation) is a lightweight data interchange format that is 
    easy for humans to read and write and easy for machines to parse and generate.

Relationship to stringify:
    In JavaScript, the built-in JSON.stringify function is the standard JSON serializer. 
    It takes a JavaScript value and converts it to a JSON string. This function is used to 
    prepare data for transmission over a network, storage in a file, or for any other operation 
    where a text representation of the data is needed.
    
Here's a step-by-step implementation of a custom JSON serializer:
- Handle Primitive Types: We need to handle null, boolean, number, and string types.

- Handle Arrays: Convert arrays by recursively serializing each element.

- Handle Objects: Convert objects by recursively serializing each key-value pair.

- Handle Special Cases: Handle undefined, functions, and symbols which are not allowed in JSON.


Here's the implementation of the custom JSON serializer:`

function customStringify(value) {
    if (value === null) {
        return 'null';
    }
    
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    
    if (typeof value === 'number') {
        // NaN and Infinity are not valid JSON numbers
        if (isNaN(value) || !isFinite(value)) {
            return 'null';
        }
        return value.toString();
    }
    
    if (typeof value === 'string') {
        // Escape special characters in the string
        return '"' + value.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t') + '"';
    }
    
    if (Array.isArray(value)) {
        const elements = value.map(el => customStringify(el)).join(',');
        return `[${elements}]`;
    }
    
    if (typeof value === 'object') {
        const keys = Object.keys(value);
        const keyValuePairs = keys.map(key => {
            const keyString = customStringify(key);
            const valueString = customStringify(value[key]);
            return `${keyString}:${valueString}`;
        }).join(',');
        return `{${keyValuePairs}}`;
    }
    
    // JSON.stringify ignores functions and undefined values
    return undefined;
}

// Example Usage
const obj = {
    name: "John",
    age: 30,
    isAdmin: false,
    courses: ["html", "css", "js"],
    wife: null
};

console.log(customStringify(obj)); // Output: {"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}
