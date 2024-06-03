// Write an analytics SDK that exposes logEvent, it takes in analytics events and queues them
// - pass a function sendAnalyticsEvent as a parameter(implement a stub function that resolves in 
// 1 second and fails every n%10 times)
// - send the next event to sendAnalyticsEvent when only after it resolves
// - when the failure occurs attempt a retry

class AnalyticsSDK {
  constructor() {
    this.eventQueue = []; // Queue to store events
    this.failureCount = 1; // Counter to simulate occasional failure
  }

  // Method to log events into the queue
  logEvent(event) {
    this.eventQueue.push(event); // Add event to the queue
  }

  // Simulated async method to send an event with a possibility of failure
  async sendEventWithRetry() {
    if (this.eventQueue.length === 0) {
      return;
    }

    const currentEvent = this.eventQueue.shift();
    console.log("Event logged: ", currentEvent);
    this.failureCount += 1;

    try {
      await this.sendEvent(currentEvent);
    } catch (err) {
      console.log("----------------------");
      console.log("Event Failed: ", currentEvent);
      console.log("Retrying: ", currentEvent);

      this.failureCount = 1;
      this.eventQueue.unshift(currentEvent);
    } finally {
      this.sendEventWithRetry();
    }
  }

  // Simulated async method to send an event
  async sendEvent(event) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.failureCount % 5 === 0) {
          reject(); // Simulate failure
        } else {
          resolve(); // Simulate success
        }
      }, 1000); // Simulate async delay of 1 second
    });
  }
}

// Create an instance of the AnalyticsSDK
const sdk = new AnalyticsSDK();

// Log events into the SDK
sdk.logEvent("Event 1");
sdk.logEvent("Event 2");
sdk.logEvent("Event 3");
sdk.logEvent("Event 4");
sdk.logEvent("Event 5");
sdk.logEvent("Event 6");
sdk.logEvent("Event 7");
sdk.logEvent("Event 8");
sdk.logEvent("Event 9");
sdk.logEvent("Event 10");
sdk.logEvent("Event 11");
sdk.logEvent("Event 12");
sdk.logEvent("Event 13");
sdk.logEvent("Event 14");
sdk.logEvent("Event 15");

// Start processing the queue
sdk.sendEventWithRetry();

`Algorithm:
- Initialize SDK with empty logs queue and a counter.
- Events are logged into the queue.
- SendAnalyticsEvent method processes events:
    -If queue is not empty:
    - Get next event from queue.
    - Attempt to send event asynchronously.
    - If successful, move to next event.
    - If failed, retry current event and reset counter.
    - Repeat until queue is empty.
- Simulated send function:
    - Delays for 1 second to simulate async operation.
    - Fails every 5th attempt to simulate failure.
- Retry mechanism:
    - Failed events are requeued for retry.
    - Counter reset prevents consecutive failures.
- Recursion handles processing of next event after current one.`;
