//Map

Array.prototype.customMap = function(callback){
    let results  = [];

    for(let i = 0; i < this.length; i++){
        results.push(callback(this[i], i, this))
    }
    return results
}


let arr = [1, 2, 3, 4, 5];

let arr_map = arr.map((elem) => elem * 2)
console.log(arr_map)

let arr_customMap = arr.customMap((elem, i, arr) => {
    return elem * 2
})
console.log(arr_customMap)




//Filter

Array.prototype.customFilter = function(callback){
    let results = [];

    for(let i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            results.push(this[i])
        }
    }
    return results
}


let arr1 = [1, 2, 3, 4, 5];

let arr_filter = arr.filter((elem) => elem !== 2)
console.log(arr_filter)


let arr_customFilter = arr.customFilter((elem, i, arr) => elem !== 2)
console.log(arr_customFilter)



// Innovaccer problem on filter

//what'd be the output?
// follow up - fix it?
Array.prototype.customMyFilter = (callback) => {
    let results = [];
    for(let i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            results.push(this[i])
        }
    }
    return results
}


let innovaccerArr = [1, 2, 3, 4, 5]

let result = innovaccerArr.customMyFilter((elem) => elem > 4)

console.log("result", result)


//Fix - instead of using "arrow" function, use "normal" function because "this" 
// will be {} not the array we are calling this customMyFilter method on beacuse of arrow function.


