// String Scramble
// Have the function StringScramble(str1,str2) take both parameters being passed and return the string true if a portion of str1 characters can be rearranged to match str2, otherwise return the string false. For example: if str1 is "rkqodlw" and str2 is "world" the output should return true. Punctuation and symbols will not be entered with the parameters.

// Input: "cdore" & str2 = "coder"
// Output: true
// Input: "h3llko" & str2 = "hello"
// Output: false

// __define-ocg__

function StringScramble(str1, str2) {
    // Convert both strings to arrays to easily manipulate characters
    var arr1 = str1.split('');
    var arr2 = str2.split('');
    
    // Iterate through each character in str2
    for (var i = 0; i < arr2.length; i++) {
      // Check if the current character exists in str1
      var index = arr1.indexOf(arr2[i]);
      // If character not found, return false
      if (index === -1) {
        return false;
      }
      // Remove character from str1 to avoid reusing it
      arr1.splice(index, 1);
    }
    
    // If all characters from str2 are found in str1, return true
    return true;
  }
  
  // Test cases
  console.log(StringScramble("rkqodlw", "world")); // true
  console.log(StringScramble("helloworld", "world")); // true
  console.log(StringScramble("hello", "world")); // false
  