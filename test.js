class HashTable{
  constructor(size){
    this.index = size
    this.table = new Array(size)
  }

  hash(key){
    let total = 0
    for(let i = 0; i < key.length; i++){
      total += charCodeAt(i)
    }
    return total % thiz.size
  }


  set(key, value){
    let index = this.hash(key)
    let bucket = this.table[index]

    if(!bucket){
      this.table[index] = [[key, value]]
    } else {
      let samekey = bucket.find((el) => el[0] !== key)
      if(!samekey){
        samekey[1] = value
      } else {
        bucket.push([key, value]);
      }
    }
  }



}