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
