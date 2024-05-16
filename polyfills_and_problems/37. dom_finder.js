// `DOM Finder: (refer to domFinder.html file in explorer)

// The goal is to find the equivalent node in a second tree (rootB) that matches
// the structure and position of a given node (nodeA) in the first tree (rootA). Once we
// locate the equivalent node in the second tree, we want to retrieve its text content.`

// `The concept involves two main parts:

//     - Path from Child to Parent: For a given node (nodeA) in the first tree (rootA),
//     we need to determine the path from this node up to the root. This path can be represented
//     as a series of indices that describe the position of each node relative to its parent.

//     - Value from Path: Using the path obtained from the first tree, we traverse the second tree
//     (rootB) to find the equivalent node. We then retrieve the text content of this node.
// `
// Function to get the path from a child node to its parent node
const getPathFromChildToParent = (parent, child) => {
    // Start with the child node
    let currentNode = child
    // Array to store the path (indices of child nodes relative to their parents)
    const pathArray = []
    
    // Loop until the current node is equal to the parent node
    while (currentNode !== parent) {
        // Get the parent element of the current node
        const parentElement = currentNode.parentElement
        // Convert the parent's children into an array for easier manipulation
        const childrenArray = Array.from(parentElement.children)
        // Find the index of the current node among its siblings and push it to the path array
        pathArray.push(childrenArray.indexOf(currentNode))
        // Move up to the parent node
        currentNode = parentElement
    }
    
    // Return the path from child to parent as an array of indices
    return pathArray
}

// Function to get the value of a node given its path from the root
const getValueFromPath = (parent, path) => {
    // Start from the parent node
    let currentNode = parent
    
    // Traverse the tree using the path
    while (path.length) {
        // Pop the last index from the path array to get the next child node
        currentNode = currentNode.children[path.pop()]
    }
    
    // Return the text content of the final node
    return currentNode.innerText
}

// Function to find the value of the equivalent node in rootB
const findNodeValue = () => {
    // Get references to the root elements and the target node
    const rootA = document.getElementById('rootA')
    const rootB = document.getElementById('rootB')
    const nodeA = document.getElementById('nodeA')
    
    // Get the path from nodeA to rootA
    const path = getPathFromChildToParent(rootA, nodeA)
    
    // Use the path to find the equivalent node in rootB and get its value
    return getValueFromPath(rootB, path)
}
// Log the value of the equivalent node in rootB
console.log("findNodeValue", findNodeValue())

