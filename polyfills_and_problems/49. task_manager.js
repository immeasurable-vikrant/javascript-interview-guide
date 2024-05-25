`
Problem Statement: 
Asynchronous Task Orchestration with Dependencies and Concurrency Limits 
or
Asynchronous Task Scheduling with Dependencies and Concurrency Limits

Background:
In complex systems, multiple asynchronous tasks often need to be coordinated in a way that respects specific 
dependencies between tasks. Additionally, systems may have constraints on the number of concurrent tasks that 
can run simultaneously to optimize resource usage and performance.

Objective:
Design and implement a system to manage the execution of multiple asynchronous tasks with specific dependencies 
and a configurable concurrency limit.

`

class TaskManager {
  constructor(concurrencyLimit) {
    this.concurrencyLimit = concurrencyLimit;
    this.currentRunning = 0;
    this.taskQueue = [];
    this.results = {};
  }

  addTask(name, dependencies, taskFunction) {
    this.taskQueue.push({ name, dependencies, taskFunction });
  }

  start() {
    this.taskQueue.forEach((task) => this.runTask(task));
  }

  runTask(task) {
    const { name, dependencies, taskFunction } = task;

    // If there are dependencies, wait for them to resolve
    const dependencyResults = dependencies.map((dep) => this.results[dep]);
    if (dependencyResults.includes(undefined)) {
      // Re-check dependencies after a delay
      setTimeout(() => this.runTask(task), 100);
      return;
    }

    // If concurrency limit is reached, wait to retry
    if (this.currentRunning >= this.concurrencyLimit) {
      // Re-check concurrency limit after a delay
      setTimeout(() => this.runTask(task), 100);
      return;
    }

    // Execute the task
    this.currentRunning++;
    taskFunction(...dependencyResults, (result) => {
      this.results[name] = result;
      this.currentRunning--;
      this.start(); // Start next tasks
    });
  }
}

// Example async tasks using callbacks
function taskA(callback) {
  setTimeout(() => {
    console.log("Task A completed");
    callback("Result A");
  }, 1000);
}

function taskB(callback) {
  setTimeout(() => {
    console.log("Task B completed");
    callback("Result B");
  }, 1500);
}

function taskC(callback) {
  setTimeout(() => {
    console.log("Task C completed");
    callback("Result C");
  }, 500);
}

function taskD(resultA, resultB, callback) {
  setTimeout(() => {
    console.log("Task D completed using:", resultA, resultB);
    callback("Result D");
  }, 2000);
}

function taskE(resultD, resultC, callback) {
  setTimeout(() => {
    console.log("Task E completed using:", resultD, resultC);
    callback("Result E");
  }, 1000);
}

// Create TaskManager with concurrency limit
const taskManager = new TaskManager(2);

// Add tasks to the manager
taskManager.addTask("A", [], taskA);
taskManager.addTask("B", [], taskB);
taskManager.addTask("C", [], taskC);
taskManager.addTask("D", ["A", "B"], taskD);
taskManager.addTask("E", ["D", "C"], taskE);

// Start execution
taskManager.start();



// Important:
`Concurrency refers to the ability of a system to execute multiple tasks or processes simultaneously, or to manage 
multiple tasks that can be in progress at the same time, though not necessarily making progress simultaneously. 
Concurrency allows for tasks to be interleaved, providing an efficient way to handle multiple operations without having 
to complete one task before starting another.`

