`
Suppose you have solved 110. serialize and deserialize binary tree, have you wondered how 
to do similar task to DOM tree ?
HTML string could be thought as some sort of serialization, the browser parses(deserialize) the
HTML → construct the DOM tree.
Besides XML base, we could try JSON for this. If we log the element presentation in React, like below

const el = <div>
 <h1> this is </h1>
 <p className="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a>
 </p>
</div>;
console.log(el)

we would get this( ref, key .etc are stripped off)

{
        type: 'div',
        props: {
          children: [
            {
              type: 'h1',
              props: {
                children: ' this is '
              }
            },
            {
              type: 'p',
              props: {
                className: 'paragraph',
                children: [
                  ' a ',
                  {
                    type: 'button',
                    props: {
                      children: ' button '
                    }
                  },
                  ' from',
                  {
                    type: 'a',
                    props: {
                      href: 'https://bfe.dev',
                      children: [
                        {
                          type: 'b',
                          props: {
                            children: 'BFE'
                          }
                        },
                        '.dev'
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
      Clearly this is the same tree structure but only in object literal.
      
      Now you are asked to serialize/deserialize the DOM tree, like what React does.
      
      Note
      
      Functions like event handlers and custom components are beyond the scope of this problem, you can ignore them, just focus on basic HTML tags.
      
      You should support:
      
      TextNode (string) as children
      single child and multiple children
      camelCased properties.
      virtualize() takes in a real DOM tree and create an object literal render() takes in a object literal presentation and recreate a DOM tree.
      
      
``
- virtualize(): Converts a DOM tree into an object literal by processing nodes, attributes, and children. 
        This makes the DOM tree easy to manipulate and compare.
- render(): Converts an object literal back into a DOM tree by creating elements, setting attributes, 
        and appending children. This reconstructs the actual DOM structure from the virtual representation.
``
virtualize() Function
The virtualize() function converts a real DOM tree into an object literal representation. 
This process is akin to how React creates its virtual DOM.
`;
function virtualize(node) {
  // Check if the node is a text node
  if (node.nodeType === Node.TEXT_NODE) {
    // For text nodes, simply return their text content
    return node.textContent;
  }

  // For element nodes (e.g., <div>, <p>, etc.)
  const obj = {
    type: node.nodeName.toLowerCase(), // Convert the node name to lowercase for consistency (e.g., 'DIV' to 'div')
    props: {}, // Initialize an object to hold the attributes and children
  };

  // Process attributes of the element node
  for (const attr of node.attributes) {
    obj.props[attr.name] = attr.value; // Add each attribute to the props object
  }

  // Process children of the element node
  const children = Array.from(node.childNodes)
    .map((child) => virtualize(child))
    .filter((child) => child !== undefined);
  // Convert each child node to its virtual representation and filter out any undefined values
  if (children.length > 0) {
    obj.props.children = children; // Add the array of children to the props object if there are any
  }

  return obj; // Return the constructed object literal representing the element
}

`
render() Function

The render() function reconstructs a real DOM tree from an object literal representation. 
This is similar to how React renders its virtual DOM.`;

function render(obj) {
  // Check if the object is a string
  if (typeof obj === "string") {
    // If it's a string, create a text node with the given string
    return document.createTextNode(obj);
  }

  // For element nodes
  const element = document.createElement(obj.type); // Create an element with the type specified in the object

  // Set attributes for the element
  for (const [key, value] of Object.entries(obj.props)) {
    if (key !== "children") {
      element.setAttribute(key, value); // Set each attribute on the element
    }
  }

  // Append children to the element
  if (obj.props.children) {
    for (const child of obj.props.children) {
      element.appendChild(render(child)); // Recursively render each child and append it to the element
    }
  }

  return element; // Return the constructed DOM element
}
