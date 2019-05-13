const { performance } = require('perf_hooks');

/**
 * Given an integer k and a string s, find the length of the longest substring that
 * contains at most k distinct characters.
 * For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
 */

 // Set the parameters for the problem;
 
const s = 'abcba';
const k = 2;

 /**
  * 
  * @param {string} s input string
  * @param {number} k at most k distinct characters
  */
function longestDistinctSubstring(s, k) {
  // Left and right index of the longest distinct substring encounted so far
  let leftIndexSoFar = 0;
  let rightIndexSoFar = 0;

  // Length of substring encountered so far
  let maxLenSoFar = 0;
  let len = 0;

  let numDistinctLTEK;
  let distinctCharSet = new Set();

  if (s == null || s.length === 0 || k < 1) {
    return '';
  }

  // For each character in string, find the longest distinct substring
  for (let i = 0; i < s.length; i++) {
    numDistinctLTEK = true;

    // If length of longest distinct substring is longer than the substring from position i to end of string,
    // then return
    if (maxLenSoFar > s.length - i) {
      break;
    }

    for (let j = i; j < s.length; j++) {
      distinctCharSet.add(s.charAt(j));

      // If substring has more distinct characters than k, move on to the next character
      if (distinctCharSet.size > k) {
        numDistinctLTEK = false;
        len = j - i;
        if (len > maxLenSoFar) {
          maxLenSoFar = len;
          leftIndexSoFar = i;
          rightIndexSoFar = j - 1;
        }
        distinctCharSet.clear();
        break;
      }
    }
    // If the number of distinct characters from position i to end of string is less than k,
    // return the substring
    if (numDistinctLTEK) {
      leftIndexSoFar = i;
      rightIndexSoFar = s.length - 1;
      break;      
    }
  }
  return s.substring(leftIndexSoFar, rightIndexSoFar + 1);
}

let start = performance.now();
console.log('longestDistinctSubstring O(nk):', longestDistinctSubstring(s, k));
console.log('Time taken:', (performance.now() - start) / 1000);