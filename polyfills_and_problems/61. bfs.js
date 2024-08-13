// Define a Node class to represent each node in the binary tree
class Node {
  constructor(value) {
    this.value = value; // The value stored in the node
    this.left = null; // Pointer to the left child
    this.right = null; // Pointer to the right child
  }
}

// Define a BinaryTree class to manage the nodes
class BinaryTree {
  constructor() {
    this.root = null; // The root of the binary tree
  }

  // Method to perform BFS and print the nodes in level order
  bfs() {
    // If the tree is empty, return immediately
    if (this.root === null) {
      return;
    }

    // Initialize a queue and enqueue the root node
    const queue = [this.root];

    // Continue the process until the queue is empty
    while (queue.length > 0) {
      // Dequeue the front node from the queue
      const current = queue.shift();

      // Print the value of the current node
      console.log(current.value);

      // Enqueue the left child if it exists
      if (current.left !== null) {
        queue.push(current.left);
      }

      // Enqueue the right child if it exists
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }
}

// Example Usage:

// Create a new binary tree
const tree = new BinaryTree();

// Manually construct the tree
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.right = new Node(3);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(5);
tree.root.right.left = new Node(6);
tree.root.right.right = new Node(7);

// Perform BFS and print the nodes in level order
tree.bfs(); // Output: 1 2 3 4 5 6 7



