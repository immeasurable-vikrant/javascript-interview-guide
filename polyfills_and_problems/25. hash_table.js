// Hashtable Data Structure:
`A hashtable is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. This index is unique for each key, allowing for fast retrieval of values.`

// Hash Maps:
`Hash maps are essentially the same as hashtables, often used interchangeably. They provide a way to map keys to values, using a hash function for indexing. In many programming languages, like Java or Python, "HashMap" is a specific implementation of a hashtable.`

// Objects in JavaScript:
`In JavaScript, objects are collections of key-value pairs where the keys are strings or symbols, and the values can be any data type, including other objects. They're one of the most fundamental data structures in JavaScript, providing a flexible way to structure data and build complex systems.`

// Now, to explain the difference and why arrays are used as buckets in hashtables:

// Difference:
`Hashtable vs. Hashmap: In practice, there's often no significant difference between hashtables and hashmaps. The terms are used interchangeably in many programming languages. The key idea is that both allow for fast key-value pair retrieval through hashing.`

// Why Array Buckets:
`Arrays are used as buckets in hashtables because they provide constant-time access to elements based on their index. When you hash a key to get an index, you need to store the corresponding value somewhere. Arrays are well-suited for this purpose because they allow for direct access to elements at specific indices, making retrieval fast.`

// Example:
`Imagine you're organizing books in a library. Each book has a unique ID (like a key), and you want to store them efficiently. Instead of arranging the books alphabetically (which would take time to search through), you decide to use a system where each shelf has a unique number (like an index). When someone asks for a book, you quickly locate it by going directly to the shelf corresponding to its ID. This is similar to how hashtables use arrays as buckets – they provide a fast way to locate values based on their hashed keys.`
`So, in simple terms, hashtables and hashmaps are efficient ways to store key-value pairs, and they use arrays as buckets because arrays provide fast access to elements based on their indices, making retrieval quick and efficient.`


class HashTable {
    constructor(size){
        this.table = new Array();
        this.size = size;
    }

    hash(key){
        let total = 0;
        for(let i = 0; i < key.length; i++){
            total += key.charCodeAt(i)
        }
        return total % this.s
    }
}


const table = new HashTable(50)