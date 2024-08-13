// Function to create a Redux store
function createStore(reducer) {
  // Initialize state variable, initially undefined
  let state;

  // Array to hold all subscribers (listeners) for state changes
  let listeners = [];

  // Function to get the current state
  const getState = () => state;

  // Function to dispatch an action to change the state
  const dispatch = (action) => {
    // Call the reducer with the current state and the action
    // This updates the state based on the action's type
    state = reducer(state, action);

    // Notify all subscribed listeners about the state change
    listeners.forEach((listener) => listener());
  };

  // Function to subscribe a listener to state changes
  const subscribe = (listener) => {
    // Add the listener to the listeners array
    listeners.push(listener);

    // Return an unsubscribe function to remove the listener
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state by dispatching a dummy action
  // This ensures the state is set with the reducer's default state
  dispatch({});

  // Return an object with methods to interact with the store
  return { getState, dispatch, subscribe };
}

// Reducer function to handle actions related to the counter
function counterReducer(state = { count: 0 }, action) {
  // Determine the new state based on the action type
  switch (action.type) {
    // Increment the count if the action type is INCREMENT
    case "INCREMENT":
      return { count: state.count + 1 };

    // Decrement the count if the action type is DECREMENT
    case "DECREMENT":
      return { count: state.count - 1 };

    // Return the current state by default if action type is not recognized
    default:
      return state;
  }
}

// Usage of the custom Redux implementation
// Create a store with the counterReducer
const store = createStore(counterReducer);

// Subscribe to state changes
// This listener will log the state whenever it changes
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch actions to modify the state
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 1 }
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 2 }
store.dispatch({ type: "DECREMENT" }); // State changed: { count: 1 }

// Unsubscribe from state changes
// After calling this, the listener will not be notified of further state changes
unsubscribe();

// Dispatch an action to increment, but no log occurs since unsubscribed
store.dispatch({ type: "INCREMENT" }); // No log since unsubscribed
