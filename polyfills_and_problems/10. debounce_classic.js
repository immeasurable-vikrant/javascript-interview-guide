// classic implementation

// Debouncing is a technique used in programming to handle scenarios where an event, such as user input or sensor readings, triggers a function repeatedly in a short period. It ensures that the function is only executed after a certain period of inactivity following the event. This helps in preventing multiple, rapid executions of the function and is particularly useful for events like scrolling, resizing, or typing, where such rapid triggering can lead to undesirable outcomes or performance issues.

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}

