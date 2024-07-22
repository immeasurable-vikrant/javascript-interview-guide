`
Implement a pair of functions in JavaScript to serialize and deserialize a binary tree. 
The serialize function should convert a binary tree into a string representation using pre-order traversal, 
including null values for missing nodes. The deserialize function should take this string representation and 
reconstruct the original binary tree. Ensure that the serialized string accurately represents the structure and 
values of the binary tree, and that the deserialized tree maintains the same structure and node values as the
 original tree. 
`

class TreeNode {
        constructor(val) {
            this.val = val; // The value of the node
            this.left = this.right = null; // Left and right children initialized to null
        }
    }
    
    function serialize(root) {
        // Array to hold the serialized tree values
        const result = [];
        
        // Helper function to perform pre-order traversal and serialize the tree
        function helper(node) {
            if (node === null) {
                // If the node is null, push 'null' to the result array
                result.push('null');
            } else {
                // Otherwise, push the node's value to the result array
                result.push(node.val);
                // Recursively serialize the left subtree
                helper(node.left);
                // Recursively serialize the right subtree
                helper(node.right);
            }
        }
        
        // Start the serialization process from the root
        helper(root);
        // Join the result array into a string separated by commas
        return result.join(',');
    }
    
    function deserialize(data) {
        // Split the input string by commas to get an array of values
        const values = data.split(',');
        // Index to keep track of the current position in the values array
        let index = 0;
        
        // Helper function to perform the deserialization
        function helper() {
            if (values[index] === 'null') {
                // If the current value is 'null', return null and move to the next value
                index++;
                return null;
            }
            
            // Create a new TreeNode with the current value
            const node = new TreeNode(parseInt(values[index]));
            // Move to the next value
            index++;
            // Recursively deserialize the left subtree
            node.left = helper();
            // Recursively deserialize the right subtree
            node.right = helper();
            // Return the constructed node
            return node;
        }
        
        // Start the deserialization process and return the root of the reconstructed tree
        return helper();
    }
    
    // Example usage:
    // Creating a binary tree:
    //      1
    //     / \
    //    2   3
    //       / \
    //      4   5
    
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(5);
    
    // Serialize the tree to a string
    const serialized = serialize(root);
    console.log(serialized); // Output: "1,2,null,null,3,4,null,null,5,null,null"
    
    // Deserialize the string back to a tree
    const deserialized = deserialize(serialized);
    console.log(deserialized); // Restored tree
    

`Serialization
Serialization is the process of converting the binary tree into a string representation. We use a pre-order traversal (root, left, right) to achieve this. Here’s a detailed explanation:

Pre-order Traversal: In this traversal, we visit the root node first, then recursively visit the left subtree, followed by the right subtree.
Null Representation: For each node, if it is null, we represent it with the string 'null' to indicate the absence of a node.
Result Array: We maintain an array to collect the node values and 'null' strings during the traversal.
Joining the Array: After traversing the entire tree, we join the array elements into a single string separated by commas. This string is the serialized representation of the binary tree.
Deserialization
Deserialization is the process of converting the string representation back into the binary tree. Here’s a detailed explanation:

Split the String: We start by splitting the serialized string by commas to get an array of values. Each value represents a node or a null.
Index Tracking: We use an index to keep track of our position in the array while reconstructing the tree.
Recursive Reconstruction: We use a helper function to recursively build the tree:
If the current value is 'null', we return null and move to the next value.
If the current value is not 'null', we create a new TreeNode with the value, then recursively build the left and right subtrees.
Returning the Root: The helper function starts with the root node and reconstructs the entire tree, returning the root of the reconstructed tree.`