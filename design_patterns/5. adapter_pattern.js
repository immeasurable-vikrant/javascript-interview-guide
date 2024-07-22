// Adapter Design Pattern (Structural Design Pattern)
// Structural design patterns focus on how objects and classes are composed to form larger structures. 
// They aim to ease the design by identifying simple ways to realize relationships among entities, 
// enhancing flexibility and efficiency in the system's architecture.
`
What:
  The Adapter pattern allows incompatible interfaces to work together. 
  It acts as a bridge between two incompatible interfaces by converting the 
  interface of a class into another interface that a client expects.

Why:
  The Adapter pattern is useful when you want to use a class that doesn't 
  have an interface compatible with the rest of your code. Instead of modifying the 
  existing class (which might not be possible or desirable), you create an adapter 
  that converts the interface.

Example:
  Imagine you have an application that displays books, and you have a Book class. 
  Now, you want to use a third-party library that provides book details, but it has a 
  LibraryBook class with a different interface.`;

// Existing Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  display() {
    console.log(`${this.title} by ${this.author}`);
  }
}

// Third-party LibraryBook class
class LibraryBook {
  constructor(name, writer) {
    this.name = name;
    this.writer = writer;
  }

  show() {
    console.log(`${this.name} by ${this.writer}`);
  }
}

// Adapter class to make LibraryBook compatible with Book
class BookAdapter {
  constructor(libraryBook) {
    this.libraryBook = libraryBook;
  }

  display() {
    this.libraryBook.show();
  }
}

// Usage
const libraryBook = new LibraryBook("Mula Madhyamaka Karika", "Nagarjuna");
const adaptedBook = new BookAdapter(libraryBook);
adaptedBook.display(); // Outputs: Mula Madhyamaka Karika Nagarjuna
