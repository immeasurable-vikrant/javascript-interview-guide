`
LRU (Least Recently Used):
    What: LRU is a caching algorithm that removes the least recently used items from the 
    cache when the cache reaches its maximum capacity.

    Why: The idea behind LRU is that items that have not been accessed for a long time are 
    less likely to be accessed in the near future, so they are good candidates for removal 
    from the cache. By removing the least recently used items, LRU maximizes the likelihood 
    of retaining frequently accessed or recently accessed items in the cache.

    Usage: LRU is widely used in various applications, including web servers, databases, 
    and operating systems, where caching is used to improve performance by storing frequently
    accessed data in memory.
`;
class LRU {
  constructor(max = 5) {
    this.max = max; // Maximum capacity of the cache
    this.cache = new Map(); // Using a Map data structure to store key-value pairs
  }

  // Method to get a value from the cache
  get(key) {
    let item = this.cache.get(key); // Retrieve item from cache using the provided key
    if (item) {
      this.cache.delete(key); // If the item exists, remove it from the cache
      this.cache.set(key, item); // Then set it again at the end to mark it as most recently used
    }
    return item; // Return the retrieved item
  }

  // Method to set a key-value pair in the cache
  set(key, value) {
    if (this.cache.has(key)) {
      // If the key already exists in the cache
      this.cache.delete(key); // Remove the existing entry
    } else if (this.cache.size === this.max) {
      // If cache is full
      this.cache.delete(this.first()); // Remove the least recently used item (the first item)
    }
    this.cache.set(key, value); // Add the new key-value pair to the cache
  }

  // Method to get the first (least recently used) key in the cache
  first() {
    return this.cache.keys().next().value; // Return the first key in the Map
  }
}

const lruCache = new LRU(3); // Create a new LRU cache with maximum capacity of 3
lruCache.set("name", "Vikrant"); // Add key-value pairs to the cache
lruCache.set("age", "27");
lruCache.set("city", "Jammu");
console.log(lruCache.cache); // Print the cache after adding initial items
lruCache.get("name"); // Access an item in the cache to mark it as most recently used
console.log(lruCache.cache); // Print the cache after accessing an item
lruCache.set("email", "vikrant.123007@gmail.com"); // Add a new item to the cache, causing eviction
console.log(lruCache.get("name")); // Try to access an evicted item (it should return undefined)
console.log(lruCache.cache); // Print the cache after adding a new item and accessing an evicted item

`
LFU (Least Frequently Used):

    What: LFU is a caching algorithm that removes the least frequently used items from the 
        cache when the cache reaches its maximum capacity.

    Why: LFU differs from LRU by focusing on the frequency of access rather than recency. 
        The idea behind LFU is that items that are accessed frequently are likely to be accessed 
        frequently in the future, so they should be retained in the cache. LFU is particularly 
        useful in scenarios where there are bursts of activity for certain items.

    Usage: LFU is used in scenarios where the access patterns are skewed or where there are 
        bursts of activity for certain items. It's commonly used in databases, web caching systems,
        and content delivery networks (CDNs) to efficiently manage cache contents.`;
