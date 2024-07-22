`
        Software design patterns are reusable solutions to commonly occurring problems in software design. 
        They provide a template or a blueprint for structuring code to solve specific design problems in a way 
        that is both efficient and maintainable. Think of them as proven best practices that have emerged from 
        the collective experience of software developers over time.

        Simple explanation: Software design patterns are like recipes for solving common problems in 
        programming. Just as a recipe tells you how to make a dish, a design pattern tells you how to 
        structure your code to solve a particular problem efficiently. They're like tricks or shortcuts 
        that experienced developers have figured out over time and shared with others, making it easier 
        for everyone to write better code.


        few common problems in software development that design patterns address:

        1. Managing Object Creation: Deciding how objects should be created in a flexible and 
        maintainable way. This includes scenarios where you want to delegate the creation of objects 
        to subclasses or ensure that only one instance of a class is created (Singleton).

        2. Handling Object Relationships: Dealing with dependencies between objects and ensuring that 
        changes in one object are reflected in others. This includes scenarios where you need to notify 
        multiple objects about changes in another object (Observer).

        3. Encapsulating Algorithms: Having multiple algorithms that need to be encapsulated and made 
        interchangeable without affecting the client code. This involves defining a family of algorithms, 
        encapsulating each one, and making them interchangeable (Strategy).

        4. Managing Object Lifecycle: Controlling the creation, usage, and destruction of objects, 
        particularly ensuring that only one instance of a class is created. This includes scenarios 
        where you need a single global point of access to an object (Singleton).

        5. Enhancing Object Functionality: Adding new functionality to objects dynamically without 
        altering their structure. This involves attaching additional responsibilities to objects 
        dynamically (Decorator).

        6. Improving Code Flexibility and Reusability: Ensuring that code can be easily adapted to 
        different scenarios and reused across different contexts. This includes defining reusable 
        templates for algorithms (Template Method) or encapsulating varying behavior in separate 
        classes (Strategy).`
        
`Terms you should know

Creational Design Pattern:

Creational design patterns are a category of design patterns that deal with object creation mechanisms, 
attempting to create objects in a manner suitable to the situation. They aim to solve problems related 
to object creation and initialization, providing flexibility and reusability in object creation processes.

"Interface" refers to a way of defining a contract or a set of rules that a class must follow.
It specifies the methods that a class must implement, but it doesn't provide the implementation details.

When should I use design patterns?

Choosing the correct design pattern in software engineering is critical to practical problem-solving.

This post will try to simplify the process, helping you decide between patterns based on specific needs.

To select a pattern, we must first go through the problem identification. If the problem is related to:

🔸 Object Creation? → Creational Patterns
🔸 Object Assembly? → Structural Patterns
🔸 Object Interactions? → Behavioral Patterns

1. Singleton: Ensures only one instance exists.
2. Factory Method: Delegates object instantiation to subclasses.
3. Abstract Factory: Creates related object families without specifying their concrete classes.
4. Prototype: Clones objects for a prototypical instance.
5. Builder: Constructs complex objects step by step.
6. Adapter: Bridges incompatible interfaces.
7. Bridge: Separates abstraction from implementation.
8. Composite: Treats single and composite objects uniformly.
9. Decorator: Adds behaviors to objects dynamically.
10. Facade: Simplifies complex system interfaces.
11. Flyweight: Shares objects to reduce memory.
12. Proxy: Controls object access.
13. Observer: Notifies changes to multiple objects.
14. Strategy: Encapsulates interchangeable algorithms.
15. Command: Encapsulates a request as an object.
16. State: Changes object behavior with internal state.
17. Visitor: Adds operations to object structures without modifying them.
18. Memento: Captures and restores object states externally.
19. Iterator: Sequentially accesses elements of a collection.
20. Mediator: Centralizes complex communications.
21. Chain of Responsibility: Passes requests along a chain of handlers.
22. Template Method: Defines the skeleton of an algorithm.`;
