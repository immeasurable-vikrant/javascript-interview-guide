`
Problem Statement
This problem builds upon the concepts introduced in "56.VDOM-I". In this problem, you are required to implement 
a simplified version of React's createElement() and render() functions.

Description
You are asked to create your own versions of the createElement() and render() functions. The createElement() 
function should be designed to construct an object representation of an HTML element, similar to how React's 
createElement() works. The render() function will then use this representation to create the actual DOM elements.

Specifications:
createElement(type, props, ...children):

type: A string representing the HTML tag name (e.g., 'div', 'h1', 'p').
props: An object containing camelCased HTML attributes (e.g., { className: 'paragraph' }).
children: Zero or more children which can be either strings (text nodes) or elements created using createElement.
render(vNode):

Takes the virtual node (created by createElement) and returns the corresponding real DOM element.
`;
// example:
const h = createElement;

render(
  h(
    "div",
    {},
    h("h1", {}, " this is "),
    h(
      "p",
      { className: "paragraph" },
      " a ",
      h("button", {}, " button "),
      " from ",
      h("a", { href: "https://bfe.dev" }, h("b", {}, "BFE"), ".dev")
    )
  )
);

// The above code should produce a DOM structure equivalent to:

(
  <div>
    <h1> this is </h1>
    <p class="paragraph">
      a<button> button </button>
      from
      <a href="https://bfe.dev">
        <b>BFE</b>
        .dev
      </a>
    </p>
  </div>
)`Notes:

- This problem does not require implementing a full React-like framework. You should focus on creating an object 
representation of HTML elements and rendering it to the DOM.
- Details like ref, key, and re-rendering are not covered in this problem and will be addressed in separate 
problems.`;

// Function to create a virtual representation of an HTML element
function createElement(type, props, ...children) {
  // Create the virtual node object
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "string"
          ? child
          : createElement(child.type, child.props, ...child.props.children)
      ),
    },
  };
}

// Function to render a virtual node into a real DOM element
function render(vNode) {
  // Check if the virtual node is a text node (string)
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  // Create the actual DOM element based on the type of the virtual node
  const element = document.createElement(vNode.type);

  // Set attributes on the element
  for (const [key, value] of Object.entries(vNode.props)) {
    if (key !== "children") {
      element.setAttribute(key, value);
    }
  }

  // Append child elements to the created element
  if (vNode.props.children) {
    for (const child of vNode.props.children) {
      element.appendChild(render(child)); // Recursively render each child and append it
    }
  }

  return element;
}
