// PubSub (Publisher-Subscriber) Pattern
`
Publisher: This is like someone sending out a message. They don’t know who will get it 
  or if anyone will get it. They just send the message to a general "topic."
Subscriber: This is like someone who is interested in receiving certain types of messages. 
  They tell the system which topics they care about.

How It Works

Sending Messages (Publishing):
- A publisher sends a message to a specific topic.
- The publisher doesn’t need to know who will receive the message; they just send it to the topic.

Receiving Messages (Subscribing):
- Subscribers choose which topics they are interested in.
- They only receive messages that are sent to the topics they have expressed interest in.

PubSub is used to enable loose coupling between components in a system. It allows components 
to communicate without needing to know about each other. This promotes scalability, modularity, 
and flexibility in the system architecture. PubSub is particularly useful in scenarios where 
multiple components need to react to events or messages asynchronously.

`;

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
    this.topics[topic].forEach((callback) => callback(data));
  }

  // Method to unsubscribe from a topic
  unsubscribe(topic, callback) {
    // If the topic doesn't exist, return early
    if (!this.topics[topic]) {
      return;
    }
    // Filter out the specified callback function from the array of subscribers for the topic
    this.topics[topic] = this.topics[topic].filter(
      (subscriber) => subscriber !== callback
    );
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

`
- Subscribers express interest in specific topics by subscribing to them. This is done by calling 
  the subscribe method of the PubSub instance, providing the desired topic and a callback function 
  to handle incoming messages.
- Publishers publish messages to specific topics using the publish method of the PubSub instance. 
  The message along with the topic is provided as parameters. When a message is published to a topic, 
  all subscribers to that topic are notified.
- When a message is published to a topic, the PubSub system delivers that message to all subscribers 
  who have expressed interest in that topic. This is done by invoking the callback functions associated 
  with the topic, passing the message data as an argument.
- Subscribers can choose to unsubscribe from topics when they are no longer interested in receiving 
  messages on those topics. This is achieved by calling the unsubscribe method of the PubSub instance, 
  providing the topic and the callback function to be removed.
``
V.Important:

In the provided code, there isn't a separate message broker explicitly defined. 
In a typical PubSub architecture, a message broker acts as an intermediary between 
publishers and subscribers. It receives messages from publishers and then distributes 
them to the appropriate subscribers based on their subscriptions.

While the code doesn't include a separate message broker component, the PubSub class 
itself serves a similar purpose. It manages the distribution of messages by maintaining 
a registry of topics and their subscribers, handling the publication of messages to topics,
and notifying subscribers when messages are published.`;

