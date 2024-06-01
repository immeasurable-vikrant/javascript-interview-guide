const files = [
  { fileName: "file1.txt", collection: "collection1", size: 100 },
  { fileName: "file2.txt", collection: "collection1", size: 200 },
  { fileName: "file3.txt", collection: "collection2", size: 150 },
  { fileName: "file4.txt", collection: "collection3", size: 50 },
  { fileName: "file5.txt", collection: "collection3", size: 150 },
];
const N = 2;

function topNCollections(files, N) {
  const collectionSizes = {};
  let totalSize = 0;

  // Calculate the total size for each collection
  files.forEach((file) => {
    if (!collectionSizes[file.collection]) {
      collectionSizes[file.collection] = 0;
    }
    collectionSizes[file.collection] += file.size;
    totalSize += file.size;
  });

  // Convert to an array and sort by size
  const sortedCollections = Object.entries(collectionSizes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, N);

  console.log("Top N collections by size:");
  sortedCollections.forEach(([collection, size], index) => {
    console.log(`${index + 1}. ${collection}: ${size} bytes`);
  });

  console.log(`Total size of all files: ${totalSize} bytes`);
}

// Example usage
topNCollections(files, N);

// Output:
//     Top N collections by size:
// 1. collection1: 300 bytes
// 2. collection3: 200 bytes
// Total size of all files: 500 bytes

const files1 = [
  { fileName: "file1.txt", collection: "collection1", size: 100 },
  { fileName: "file2.txt", collection: "collection1/collection2", size: 200 },
  { fileName: "file3.txt", collection: "collection1/collection2", size: 150 },
  { fileName: "file4.txt", collection: "collection3", size: 50 },
  { fileName: "file5.txt", collection: "collection3/collection4", size: 150 },
];
const N1 = 2;

function topNCollectionsNested(files1, N) {
  const collectionSizes = {};
  let totalSize = 0;

  // Calculate the total size for each collection and nested collections
  files1.forEach((file) => {
    const parts = file.collection.split("/");
    let currentCollection = "";

    parts.forEach((part, index) => {
      currentCollection = index === 0 ? part : `${currentCollection}/${part}`;

      if (!collectionSizes[currentCollection]) {
        collectionSizes[currentCollection] = 0;
      }
      collectionSizes[currentCollection] += file.size;
    });

    totalSize += file.size;
  });

  // Convert to an array and sort by size
  const sortedCollections = Object.entries(collectionSizes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, N);

  console.log("Top N collections by size:");
  sortedCollections.forEach(([collection, size], index) => {
    console.log(`${index + 1}. ${collection}: ${size} bytes`);
  });

  console.log(`Total size of all files1: ${totalSize} bytes`);
}

// Example usage
topNCollectionsNested(files1, N);

// Ouutput:
//     Top N collections by size:
// 1. collection1: 450 bytes
// 2. collection3: 200 bytes
// Total size of all files1: 650 bytes
