// Time based Throttle

// If both options are true it will work as "leading" only and only if leading is "false", then only it will work as "trailing".
// Define a throttle function that takes three parameters: 'func' (the function to throttle), 'delay' (the time interval to throttle), and 'option' (an object with leading and trailing options)
const throttle = (func, delay, option = { leading: true, trailing: true }) => {
    let lastTimerId;
    let lastArgs; // Keeps track of the last arguments passed to the throttled function

    // Return a new function that will be invoked when triggered
    return (...args) => {
        const { leading, trailing } = option;
        const context = this;

        // Function to be called when the delay period expires
        const waitFunc = () => {
            if (trailing && lastArgs) {
                // If trailing is true and there are pending arguments, invoke the function
                func.apply(context, lastArgs);
                lastArgs = null; // Reset lastArgs
                lastTimerId = setTimeout(waitFunc, delay); // Set a new timer
            } else {
                lastTimerId = null; // Reset lastTimerId if trailing is false or no pending arguments
            }
        };

        if (!lastTimerId && leading) {
            // If leading is true and there's no pending timer, invoke the function immediately
            func.apply(context, args);
        } else {
            lastArgs = args; // Store the arguments for potential use in trailing invocation
        }

        if (!lastTimerId) {
            // If there's no pending timer, set a new one
            lastTimerId = setTimeout(waitFunc, delay);
        }
    };
};
