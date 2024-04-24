// Flatten Object
function flattenObject(obj, parent){
    let flattenedObject = {};

    function generateFlattenedObjects(obj, parent){
        for(let key in obj){
            let newParent = parent + key;
            if(typeof obj[key] === 'object'){
                generateFlattenedObjects(obj[key], newParent + '.')
            } else {
                flattenedObject[newParent] = obj[key]
            }
        }
    }
    generateFlattenedObjects(obj, parent)
    return flattenedObject
}




const obj1 = {
    a: '1',
    b: {
        c: '2',
        d: {
            e: {
                f: '3'
            }
        }
    }
}


console.log(flattenObject(obj1, ''))





















// function flattenObject(obj, parent) {
//     const finalObj = {};
//     const generateFlatObjects = (obj, parent) => {
//       for (let key in obj) {
//         const newParent = parent + key;
//         if (typeof obj[key] === "object") {
//           generateFlatObjects(obj[key], newParent + ".");
//         } else {
//           finalObj[newParent] = obj[key];
//         }
//       }
//     };
//     generateFlatObjects(obj, parent);
//     return finalObj;
//   }
  
//   const obj = {
//     A: "12",
//     B: 23,
//     C: {
//       P: 23,
//       O: {
//         L: 56,
//       },
//       Q: [1, 2],
//     },
//   };
  
//   console.log(flattenObject(obj, ""));
  