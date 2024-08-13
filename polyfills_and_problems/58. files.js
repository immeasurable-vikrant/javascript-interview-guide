`You have a list of files, each belonging to a collection or nested collection structure. 
Each file is characterized by its name, the collection it belongs to, and its size in bytes. 
The goal is to determine the top N collections by total file size, taking into account both 
flat and nested collections. Additionally, you need to calculate the total size of all files 
across all collections`;

const files = [
  { fileName: "file1.txt", collection: "collection1", size: 100 },
  { fileName: "file2.txt", collection: "collection1", size: 200 },
  { fileName: "file3.txt", collection: "collection2", size: 150 },
  { fileName: "file4.txt", collection: "collection3", size: 50 },
  { fileName: "file5.txt", collection: "collection3", size: 150 },
];

const files1 = [
  { fileName: "file1.txt", collection: "collection1", size: 100 },
  { fileName: "file2.txt", collection: "collection1/collection2", size: 200 },
  { fileName: "file3.txt", collection: "collection1/collection2", size: 150 },
  { fileName: "file4.txt", collection: "collection3", size: 50 },
  { fileName: "file5.txt", collection: "collection3/collection4", size: 150 },
];

// Function to calculate top N collections by size for flat collections
function topNCollections(files, N) {
  const collectionSizes = {};
  let totalSize = 0;

  // Calculate the total size for each collection
  files.forEach((file) => {
    // Check if the collection already has a size, if not initialize it
    if (!collectionSizes[file.collection]) {
      collectionSizes[file.collection] = 0;
    }
    // Accumulate the size of each file to the corresponding collection
    collectionSizes[file.collection] += file.size;
    // Accumulate the total size of all files
    totalSize += file.size;
  });

  // Convert collection sizes to an array of entries and sort by size
  const sortedCollections = Object.entries(collectionSizes)
    .sort((a, b) => b[1] - a[1]) // Sort in descending order of size
    .slice(0, N); // Select top N collections

  // Output the results
  console.log("Top N collections by size:");
  sortedCollections.forEach(([collection, size], index) => {
    console.log(`${index + 1}. ${collection}: ${size} bytes`);
  });

  console.log(`Total size of all files: ${totalSize} bytes`);
}

// Function to calculate top N collections by size for nested collections
function topNCollectionsNested(files, N) {
  const collectionSizes = {};
  let totalSize = 0;

  // Calculate the total size for each collection and nested collections
  files.forEach((file) => {
    // Split the collection path into parts
    const parts = file.collection.split("/");
    let currentCollection = "";

    // Accumulate size for each part of the path
    parts.forEach((part, index) => {
      currentCollection = index === 0 ? part : `${currentCollection}/${part}`;

      // Check if the current collection has a size, if not initialize it
      if (!collectionSizes[currentCollection]) {
        collectionSizes[currentCollection] = 0;
      }
      // Accumulate the size of the file
      collectionSizes[currentCollection] += file.size;
    });

    // Accumulate the total size of all files
    totalSize += file.size;
  });

  // Convert collection sizes to an array of entries and sort by size
  const sortedCollections = Object.entries(collectionSizes)
    .sort((a, b) => b[1] - a[1]) // Sort in descending order of size
    .slice(0, N); // Select top N collections

  // Output the results
  console.log("Top N collections by size:");
  sortedCollections.forEach(([collection, size], index) => {
    console.log(`${index + 1}. ${collection}: ${size} bytes`);
  });

  console.log(`Total size of all files1: ${totalSize} bytes`);
}

// Example usage
const N = 2;
topNCollections(files, N);

const N1 = 2;
topNCollectionsNested(files1, N1);
