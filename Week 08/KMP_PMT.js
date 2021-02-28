function getMatchTable(pattern) {
  let first = 0;
  let second = 1;
  let matchTable = [];

  matchTable[0] = 0;

  while (second < pattern.length) {
    if (pattern[first] === pattern[second]) {
      matchTable[second] = first + 1;
      first++;
      second++;
    } else {
      if (first === 0)
      {
        matchTable[second] = 0;
        second++;
      } else {
        first =  matchTable[first-1];
      }
    }
  }
  return matchTable;
}


function kmp(string, pattern) {

  let strIndex = 0;
  let patternIndex = 0;
  let matchTable = getMatchTable(pattern);
  console.log(matchTable);

  while (strIndex < string.length) {
    if (pattern[patternIndex] === string[strIndex]) {
      if (patternIndex === pattern.length - 1) {
        return strIndex - patternIndex;
      }

      strIndex++;
      patternIndex++;
    } else {
      if (patternIndex > 0) {
        patternIndex = matchTable[patternIndex - 1];
      } else {
        strIndex++;
      }
    }
  }
  return -1;
}

console.log(kmp("aababaabaaaca","aabaaac"));
console.log(getMatchTable("aabaaac"));
