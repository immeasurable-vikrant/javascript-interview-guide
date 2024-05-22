// Ensure that unhandled rejections are properly logged
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You can optionally exit the process with a non-zero status
    // process.exit(1);
  });
  
  const createAsyncTask = () => {
    const value = Math.floor(Math.random() * 10);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value < 5) {
          reject(new Error(`Error: ${value}`));
        } else {
          resolve(`Success: ${value * 1000}`);
        }
      }, value * 1000);
    });
  };
  
  const tasks = [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
  ];
  
  const asyncInSequence = async (tasks, callback) => {
    const results = [];
    const errors = [];
  
    for (const task of tasks) {
      try {
        const result = await task;
        results.push(result);
      } catch (error) {
        errors.push(error);
      }
    }
  
    callback(errors, results);
  };
  
  asyncInSequence(tasks, (errors, results) => {
    console.log("results", results);
    console.error("errors", errors);
  });
  