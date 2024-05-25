// Create the Redux store
function createStore(reducer) {
  let state;
  let listeners = [];

  // Get the current state
  const getState = () => state;

  // Dispatch an action to change the state
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  // Subscribe to state changes
  const subscribe = (listener) => {
    listeners.push(listener);
    // Return an unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state by dispatching a dummy action
  dispatch({});

  return { getState, dispatch, subscribe };
}

// Reducer function
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Usage of the custom Redux implementation
const store = createStore(counterReducer);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 1 }
store.dispatch({ type: "INCREMENT" }); // State changed: { count: 2 }
store.dispatch({ type: "DECREMENT" }); // State changed: { count: 1 }

// Unsubscribe from state changes
unsubscribe();

store.dispatch({ type: "INCREMENT" }); // No log since unsubscribed
