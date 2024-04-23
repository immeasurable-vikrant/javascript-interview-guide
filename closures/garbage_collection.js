
// Memory management

// Low-level languages like C, have manual memory management primitives such as malloc() and free(). In contrast, JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore (garbage collection). This automaticity is a potential source of confusion: it can give developers the false impression that they don't need to worry about memory management.

// Memory life cycle
// Regardless of the programming language, the memory life cycle is pretty much always the same:

// Allocate the memory you need
// Use the allocated memory (read, write)
// Release the allocated memory when it is not needed anymore


// The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript.

// Allocation in JavaScript
// Value initialization
// In order to not bother the programmer with allocations, JavaScript will automatically allocate memory when values are initially declared.


// JS
// const n = 123; // allocates memory for a number
// const s = "azerty"; // allocates memory for a string

// const o = {
//   a: 1,
//   b: null,
// }; allocates memory for an object and contained values

// // (like object) allocates memory for the array and
// contained values
// const a = [1, null, "abra"];

// function f(a) {
//   return a + 2;
// } // allocates a function (which is a callable object)

// function expressions also allocate an object
// someElement.addEventListener(
//   "click",
//   () => {
//     someElement.style.backgroundColor = "blue";
//   },
//   false,
// );


// Using values
// Using values basically means reading and writing in allocated memory. This can be done by reading or writing the value of a variable or an object property or even passing an argument to a function.

// Release when the memory is not needed anymore
// The majority of memory management issues occur at this phase. The most difficult aspect of this stage is determining when the allocated memory is no longer needed.

// Low-level languages require the developer to manually determine at which point in the program the allocated memory is no longer needed and to release it.

// Some high-level languages, such as JavaScript, utilize a form of automatic memory management known as garbage collection (GC). The purpose of a garbage collector is to monitor memory allocation and determine when a block of allocated memory is no longer needed and reclaim it. This automatic process is an approximation since the general problem of determining whether or not a specific piece of memory is still needed is undecidable.

// Garbage collection
// As stated above, the general problem of automatically finding whether some memory "is not needed anymore" is undecidable. As a consequence, garbage collectors implement a restriction of a solution to the general problem. This section will explain the concepts that are necessary for understanding the main garbage collection algorithms and their respective limitations.

// References
// The main concept that garbage collection algorithms rely on is the concept of reference. Within the context of memory management, an object is said to reference another object if the former has access to the latter (either implicitly or explicitly). For instance, a JavaScript object has a reference to its prototype (implicit reference) and to its properties values (explicit reference).

// In this context, the notion of an "object" is extended to something broader than regular JavaScript objects and also contain function scopes (or the global lexical scope).



// Reference-counting garbage collection
// Note: no modern JavaScript engine uses reference-counting for garbage collection anymore.

// This is the most naïve garbage collection algorithm. This algorithm reduces the problem from determining whether or not an object is still needed to determining if an object still has any other objects referencing it. An object is said to be "garbage", or collectible if there are zero references pointing to it.

// For example:

// JS
// Copy to Clipboard
// let x = {
//   a: {
//     b: 2,
//   },
// };
// 2 objects are created. One is referenced by the other as one of its properties.
// The other is referenced by virtue of being assigned to the 'x' variable.
// Obviously, none can be garbage-collected.

// let y = x;
// // The 'y' variable is the second thing that has a reference to the object.

// x = 1;
// // Now, the object that was originally in 'x' has a unique reference
// // embodied by the 'y' variable.

// let z = y.a;
// // Reference to 'a' property of the object.
// // This object now has 2 references: one as a property,
// // the other as the 'z' variable.

// y = "mozilla";
// The object that was originally in 'x' has now zero
// references to it. It can be garbage-collected.
// However its 'a' property is still referenced by
// the 'z' variable, so it cannot be freed.

// z = null;
// // The 'a' property of the object originally in x
// // has zero references to it. It can be garbage collected.
// There is a limitation when it comes to circular references. In the following example, two objects are created with properties that reference one another, thus creating a cycle. They will go out of scope after the function call has completed. At that point they become unneeded and their allocated memory should be reclaimed. However, the reference-counting algorithm will not consider them reclaimable since each of the two objects has at least one reference pointing to them, resulting in neither of them being marked for garbage collection. Circular references are a common cause of memory leaks.

// JS
// function f() {
//   const x = {};
//   const y = {};
//   x.a = y; // x references y
//   y.a = x; // y references x

//   return "azerty";
// }
// f();


// Mark-and-sweep algorithm
// This algorithm reduces the definition of "an object is no longer needed" to "an object is unreachable".

// This algorithm assumes the knowledge of a set of objects called roots. In JavaScript, the root is the global object. Periodically, the garbage collector will start from these roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.

// This algorithm is an improvement over the previous one since an object having zero references is effectively unreachable. The opposite does not hold true as we have seen with circular references.

// Currently, all modern engines ship a mark-and-sweep garbage collector. All improvements made in the field of JavaScript garbage collection (generational/incremental/concurrent/parallel garbage collection) over the last few years are implementation improvements of this algorithm, but not improvements over the garbage collection algorithm itself nor its reduction of the definition of when "an object is no longer needed".

// The immediate benefit of this approach is that cycles are no longer a problem. In the first example above, after the function call returns, the two objects are no longer referenced by any resource that is reachable from the global object. Consequently, they will be found unreachable by the garbage collector and have their allocated memory reclaimed.

// However, the inability to manually control garbage collection remains. There are times when it would be convenient to manually decide when and what memory is released. In order to release the memory of an object, it needs to be made explicitly unreachable. It is also not possible to programmatically trigger garbage collection in JavaScript — and will likely never be within the core language, although engines may expose APIs behind opt-in flags.

// Configuring an engine's memory model
// JavaScript engines typically offer flags that expose the memory model. For example, Node.js offers additional options and tools that expose the underlying V8 mechanisms for configuring and debugging memory issues. This configuration may not be available in browsers, and even less so for web pages (via HTTP headers, etc.).

// The max amount of available heap memory can be increased with a flag:

// BASH
// node --max-old-space-size=6000 index.js
// We can also expose the garbage collector for debugging memory issues using a flag and the Chrome Debugger:

// BASH]
// node --expose-gc --inspect index.js
// Data structures aiding memory management
// Although JavaScript does not directly expose the garbage collector API, the language offers several data structures that indirectly observe garbage collection and can be used to manage memory usage.

// WeakMaps and WeakSets
// WeakMap and WeakSet are data structures whose APIs closely mirror their non-weak counterparts: Map and Set. WeakMap allows you to maintain a collection of key-value pairs, while WeakSet allows you to maintain a collection of unique values, both with performant addition, deletion, and querying.

// WeakMap and WeakSet got the name from the concept of weakly held values. If x is weakly held by y, it means that although you can access the value of x via y, the mark-and-sweep algorithm won't consider x as reachable if nothing else strongly holds to it. Most data structures, except the ones discussed here, strongly holds to the objects passed in so that you can retrieve them at any time. The keys of WeakMap and WeakSet can be garbage-collected (for WeakMap objects, the values would then be eligible for garbage collection as well) as long as nothing else in the program is referencing the key. This is ensured by two characteristics:

// WeakMap and WeakSet can only store objects or symbols. This is because only objects are garbage collected — primitive values can always be forged (that is, 1 === 1 but {} !== {}), making them stay in the collection forever. Registered symbols (like Symbol.for("key")) can also be forged and thus not garbage collectable, but symbols created with Symbol("key") are garbage collectable. Well-known symbols like Symbol.iterator come in a fixed set and are unique throughout the lifetime of the program, similar to intrinsic objects such as Array.prototype, so they are also allowed as keys.
// WeakMap and WeakSet are not iterable. This prevents you from using Array.from(map.keys()).length to observe the liveliness of objects, or get hold of an arbitrary key which should otherwise be eligible for garbage collection. (Garbage collection should be as invisible as possible.)
// In typical explanations of WeakMap and WeakSet (such as the one above), it's often implied that the key is garbage-collected first, freeing the value for garbage collection as well. However, consider the case of the value referencing the key:

// JS
// const wm = new WeakMap();
// const key = {};
// wm.set(key, { key });
// // Now `key` cannot be garbage collected,
// // because the value holds a reference to the key,
// // and the value is strongly held in the map!
// If key is stored as an actual reference, it would create a cyclic reference and make both the key and value ineligible for garbage collection, even when nothing else references key — because if key is garbage collected, it means that at some particular instant, value.key would point to a non-existent address, which is not legal. To fix this, the entries of WeakMap and WeakSet aren't actual references, but ephemerons, an enhancement to the mark-and-sweep mechanism. Barros et al. offers a good summary of the algorithm (page 4). To quote a paragraph: