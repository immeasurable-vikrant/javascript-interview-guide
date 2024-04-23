//  Have the function ArrayAddition(arr) take the array of numbers stored in arr and return the string true if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string false. For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because 4 + 6 + 10 + 3 = 23. The array will not be empty, will not contain all the same elements, and may contain negative numbers.


// Input: [5,7,16,1,2]
// Output: false
// Input: [3,5,-1,8,12]
// Output: true


function ArrayAddition(arr) {
    // Find the largest number in the array
    var largest = Math.max.apply(null, arr);
    
    // Remove the largest number from the array
    var index = arr.indexOf(largest);
    arr.splice(index, 1);
    
    // Function to recursively check if sum can be obtained from array elements
    function canSumTo(target, nums) {
      // Base case: If target is 0, return true (sum is obtained)
      if (target === 0) {
        return true;
      }
      // Base case: If target is negative or no more numbers left, return false
      if (target < 0 || nums.length === 0) {
        return false;
      }
      // Use recursion by including and excluding current number
      return canSumTo(target - nums[0], nums.slice(1)) || canSumTo(target, nums.slice(1));
    }
    
    // Check if sum can be obtained using remaining numbers
    return canSumTo(largest, arr);
  }
  
  // Test cases
  console.log(ArrayAddition([4, 6, 23, 10, 1, 3])); // true
  console.log(ArrayAddition([5, 7, 16, 1, 2])); // false
  console.log(ArrayAddition([3, 5, -1, 8, 12])); // true
  