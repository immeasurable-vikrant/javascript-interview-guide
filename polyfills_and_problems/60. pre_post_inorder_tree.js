`
1. Pre-order Traversal

Algorithm:
- Visit: Visit the root node.
- Traverse Left: Recursively traverse the left subtree.
- Traverse Right: Recursively traverse the right subtree.

Explanation:
- Visit: Add the root node's value to the result array.
- Traverse Left: Recursively call traverse on the left child.
- Traverse Right: Recursively call traverse on the right child.`;

function preorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) {
      return;
    }

    // Visit the root node
    result.push(node.val);

    // Traverse left subtree
    traverse(node.left);

    // Traverse right subtree
    traverse(node.right);
  }

  traverse(root);
  return result;
}

`
2.  In-order Traversal

Algorithm:

- Traverse Left: Recursively traverse the left subtree.
- Visit: Visit the root node.
- Traverse Right: Recursively traverse the right subtree.

Explanation:

- Traverse Left: Recursively call traverse on the left child before visiting the root.
- Visit: Add the root node's value to the result array after the left subtree.
- Traverse Right: Recursively call traverse on the right child after visiting the root.

`;
function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) {
      return;
    }

    // Traverse left subtree
    traverse(node.left);

    // Visit the root node
    result.push(node.val);

    // Traverse right subtree
    traverse(node.right);
  }

  traverse(root);
  return result;
}

`    3. Post-order Traversal

    Algorithm:
    
    - Traverse Left: Recursively traverse the left subtree.
    - Traverse Right: Recursively traverse the right subtree.
    - Visit: Visit the root node.
    
    Explanation:

        - Traverse Left: Recursively call traverse on the left child before visiting the root.
        - Traverse Right: Recursively call traverse on the right child after the left subtree.
        - Visit: Add the root node's value to the result array after both subtrees.

    `;

function postorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (node === null) {
      return;
    }

    // Traverse left subtree
    traverse(node.left);

    // Traverse right subtree
    traverse(node.right);

    // Visit the root node
    result.push(node.val);
  }

  traverse(root);
  return result;
}

`Example Usage`;
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

// Creating a binary tree:
//      1
//     / \
//    2   3
//   / \ / \
//  4  5 6  7

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log("Pre-order Traversal:", preorderTraversal(root));
// Output: [1, 2, 4, 5, 3, 6, 7]

console.log("In-order Traversal:", inorderTraversal(root));
// Output: [4, 2, 5, 1, 6, 3, 7]

console.log("Post-order Traversal:", postorderTraversal(root));
// Output: [4, 5, 2, 6, 7, 3, 1]
