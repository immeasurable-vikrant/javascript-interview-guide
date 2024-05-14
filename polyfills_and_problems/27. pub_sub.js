`PubSub stands for Publisher-Subscriber, which is a messaging pattern where senders 
of messages (publishers) do not program the messages to be sent directly to specific 
receivers (subscribers). Instead, messages are published to topics without any knowledge 
of which subscribers, if any, there may be. Subscribers express interest in one or more 
topics and only receive messages that are of interest to them.

PubSub is used to enable loose coupling between components in a system. It allows components 
to communicate without needing to know about each other. This promotes scalability, modularity, 
and flexibility in the system architecture. PubSub is particularly useful in scenarios where 
multiple components need to react to events or messages asynchronously.

`

class PubSub {
  constructor() {
    // Initialize an empty object to store topics and their subscribers
    this.topics = {};
  }

  // Method to subscribe to a topic
  subscribe(topic, callback) {
    // If the topic doesn't exist yet, create an empty array for its subscribers
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    // Push the callback function to the array of subscribers for the given topic
    this.topics[topic].push(callback);
  }

  // Method to publish a message to a topic
  publish(topic, data) {
    // If the topic doesn't exist or has no subscribers, return early
    if (!this.topics[topic]) {
      return;
    }
    // Iterate over each subscriber callback for the given topic and invoke it with the data
    this.topics[topic].forEach(callback => callback(data));
  }

  // Method to unsubscribe from a topic
  unsubscribe(topic, callback) {
    // If the topic doesn't exist, return early
    if (!this.topics[topic]) {
      return;
    }
    // Filter out the specified callback function from the array of subscribers for the topic
    this.topics[topic] = this.topics[topic].filter(subscriber => subscriber !== callback);
  }
}

// Example usage
const pubsub = new PubSub();

// Callback function to handle received messages
function handleMessage(data) {
  console.log("Received message:", data);
}

// Subscribe to the "news" topic
pubsub.subscribe("news", handleMessage);

// Publish a message to the "news" topic
pubsub.publish("news", "Breaking news: JavaScript is awesome!");

// Unsubscribe from the "news" topic
pubsub.unsubscribe("news", handleMessage);

// Publish another message to the "news" topic (won't be received by the subscriber)
pubsub.publish("news", "This message won't be received.");

