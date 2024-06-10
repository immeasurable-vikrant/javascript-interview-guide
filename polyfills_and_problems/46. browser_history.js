`
Develop a simple browser history simulator to manage visited URLs and navigate through 
browsing history.

`;

function BrowserHistory() {
  // Initialize history array to store visited URLs and set index to -1
  // indicating no history initially.
  this.history = [];
  this.index = -1;

  // Method to visit a new URL
  this.visit = function (url) {
    // When a new URL is visited, add it to the history array and update the index.
    // Incrementing the index ensures that the new URL is added at the correct position.
    this.history[++this.index] = url;
    // Remove any forward history since we're starting a new path from the current index.
    this.history.length = this.index + 1;
  };

  // Method to get the current URL
  this.current = function () {
    // If index is less than 0, it means there's no history, so return "Blank Page"
    if (this.index < 0) {
      return "Blank Page";
    }
    // Otherwise, return the URL at the current index.
    return this.history[this.index];
  };

  // Method to navigate backward in history
  this.backward = function () {
    // Decrement the index to move backward in history.
    // Ensure that index doesn't go below -1, meaning no history is available.
    this.index = Math.max(-1, --this.index);
  };

  // Method to navigate forward in history
  this.forward = function () {
    // Increment the index to move forward in history.
    // Ensure that index doesn't exceed the length of history array - 1, meaning no
    // future history is available.
    this.index = Math.min(this.history.length - 1, ++this.index);
  };
}

const browser = new BrowserHistory();

// Visit some URLs
browser.visit("https://example.com");
browser.visit("https://openai.com");
browser.visit("https://stackoverflow.com");

// Get the current URL
console.log(browser.current()); // Output: https://stackoverflow.com

// Navigate backward
browser.backward();
console.log(browser.current()); // Output: https://openai.com

// Navigate backward again
browser.backward();
console.log(browser.current()); // Output: https://example.com

// Navigate forward
browser.forward();
console.log(browser.current()); // Output: https://openai.com

// Visit a new URL
browser.visit("https://github.com");

// Get the current URL
console.log(browser.current()); // Output: https://github.com

// Navigate forward (should have no effect as there's no future history)
browser.forward();
console.log(browser.current()); // Output: https://github.com

// Visit a new URL
browser.visit("https://wikipedia.org");

// Get the current URL
console.log(browser.current()); // Output: https://wikipedia.org
