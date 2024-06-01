`In JavaScript, the static keyword is used to define a method or property on the 
class itself, rather than on instances of the class. This means that the method or 
property can be called directly on the class without needing to create an instance 
of the class.`;

class JSON {
  static parse(string) {
    // Remove leading and trailing whitespace
    string = string.trim();

    // Handle different JSON data types
    switch (string) {
      case "":
        throw new SyntaxError("Unexpected end of input");
      case "null":
        return null;
      case "{}":
        return {};
      case "[]":
        return [];
      case "true":
        return true;
      case "false":
        return false;
      default:
        // If the string represents a number, parse and return it
        if (!isNaN(string)) {
          return Number(string);
        }

        // Handle string literals
        if (string[0] === '"' && string[string.length - 1] === '"') {
          return this.parseString(string);
        }

        // Handle arrays
        if (string[0] === "[" && string[string.length - 1] === "]") {
          const innerString = string.slice(1, -1);
          const subStrings = this.stringSplitByComma(innerString);
          return subStrings.map((item) => this.parse(item));
        }

        // Handle objects
        if (string[0] === "{" && string[string.length - 1] === "}") {
          const innerString = string.slice(1, -1);
          const subStrings = this.stringSplitByComma(innerString);
          return subStrings.reduce((acc, item) => {
            const index = item.indexOf(":");
            if (index === -1) {
              throw new SyntaxError("Expected colon after key in object");
            }
            const key = item.substring(0, index).trim();
            const value = item.substring(index + 1).trim();
            acc[this.parse(key)] = this.parse(value);
            return acc;
          }, {});
        }

        throw new SyntaxError("Unexpected token");
    }
  }

  static parseString(string) {
    let result = "";
    for (let i = 1; i < string.length - 1; i++) {
      if (string[i] === "\\") {
        i++;
        const escapeChars = {
          '"': '"',
          "\\": "\\",
          "/": "/",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        if (escapeChars[string[i]]) {
          result += escapeChars[string[i]];
        } else if (string[i] === "u") {
          const hex = string.substr(i + 1, 4);
          if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
            throw new SyntaxError("Invalid Unicode escape sequence");
          }
          result += String.fromCharCode(parseInt(hex, 16));
          i += 4;
        } else {
          throw new SyntaxError("Invalid escape character");
        }
      } else {
        result += string[i];
      }
    }
    return result;
  }

  static stringSplitByComma(string) {
    const allStrs = [];
    let lParen = 0,
      lCurly = 0;
    let left = 0,
      right = 0;

    while (right <= string.length) {
      const rChar = string[right];
      if (rChar === "[") lParen++;
      if (rChar === "{") lCurly++;
      if (rChar === "]") lParen--;
      if (rChar === "}") lCurly--;

      if (
        (rChar === "," && lParen === 0 && lCurly === 0) ||
        right === string.length
      ) {
        const thisStr = string.substring(left, right).trim();
        if (thisStr) {
          allStrs.push(thisStr);
        }
        left = right + 1;
      }
      right++;
    }

    return allStrs;
  }
}

// Example Usage
const jsonString =
  '{"name":"John","age":30,"isAdmin":false,"courses":["html","css","js"],"wife":null}';
console.log(JSON.parse(jsonString));
// Output: { name: 'John', age: 30, isAdmin: false, courses: [ 'html', 'css', 'js' ], wife: null }
