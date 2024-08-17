`
Object.create is a method in JavaScript that creates a new object with the specified 
prototype object and properties. It allows you to create an object that inherits from 
another object without directly calling a constructor function.

`;
// Check if Object.create is not already defined
if (typeof Object.create !== "function") {
  // Define Object.create function for creating a new object with a specified prototype
  Object.create = function (prototypeObject, propertiesObject) {
    // Temporary constructor function to create an object
    function TempConstructor() {}

    // Set the prototype of the temporary constructor to the provided prototypeObject
    TempConstructor.prototype = prototypeObject;

    // If propertiesObject is provided and is of type 'object'
    if (typeof propertiesObject === "object") {
      // Iterate over each property in propertiesObject
      for (let property in propertiesObject) {
        // Ensure the property is a direct property of propertiesObject
        if (propertiesObject.hasOwnProperty(property)) {
          // Assign the property to the TempConstructor function's prototype
          TempConstructor[property] = propertiesObject[property];
        }
      }
    }

    // Return a new instance of TempConstructor, which has the specified prototype
    return new TempConstructor();
  };
}

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

// Create a new object that inherits from person
const me = Object.create(person);
me.name = "Vikrant"; // Add a property
me.isHuman = true; // Override an inherited property

me.printIntroduction(); // Output: My name is Vikrant. Am I human? true






if(!typeof Object.create !== 'function'){
  Object.create = function(prototypeObject, propertiesObject){
    function TempConstructor() {}

    TempConstructor.prototype = prototypeObject

    if(typeof propertiesObject == 'object'){
      for(let property in propertiesObject){
        if(property.hasOwnProperty(propertiesObject)){
          TempConstructor[property] = propertiesObject[property]
        }
      }
    }

    return new TempConstructor()
  }
}