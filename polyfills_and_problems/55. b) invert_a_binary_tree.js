class TreeNode {
        constructor(val) {
            this.val = val; // The value of the node
            this.left = this.right = null; // Left and right children initialized to null
        }
    }
    
    function invertTree(root) {
        // Base case: If the node is null, there is nothing to invert
        if (root === null) {
            return null;
        }
    
        // Swap the left and right children of the current node
        const temp = root.left; // Temporarily store the left child
        root.left = root.right; // Assign the right child to the left
        root.right = temp; // Assign the stored left child to the right
    
        // Recursively invert the left subtree (which was originally the right subtree)
        invertTree(root.left);
        // Recursively invert the right subtree (which was originally the left subtree)
        invertTree(root.right);
    
        // Return the root of the inverted tree
        return root;
    }
    
    // Example usage:
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
    
    // Invert the binary tree
    const invertedRoot = invertTree(root);
    
    // Output the inverted tree structure for verification
    function printTree(node, level = 0) {
        if (node !== null) {
            console.log(' '.repeat(level * 4) + node.val);
            printTree(node.left, level + 1);
            printTree(node.right, level + 1);
        }
    }
    
    printTree(invertedRoot);
    // Output should be:
    //      1
    //     / \
    //    3   2
    //   / \ / \
    //  7  6 5  4
    