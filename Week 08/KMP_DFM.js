function KMP(pattern) {
  let length = pattern.length;
  let dfa = new Array();
  let deDuplicObject = {};
  let stateX = 0;

  for (let val of pattern) {
    if (!deDuplicObject[val]) {
      deDuplicObject[val] = val;
    }
  }

  for (let i = 0; i < length; i++)
    dfa[i] = {...deDuplicObject};

  for (let key in dfa[0])
    dfa[0][key] = 0;

  dfa[0][pattern[0]] = 1;

  for (j=1; j < length; j++) {

    for (let deDuplicVal in deDuplicObject)
      dfa[j][deDuplicVal] = dfa[stateX][deDuplicVal];

    dfa[j][pattern[j]] = j + 1;
    stateX = dfa[stateX][pattern[j]];
  }
  return dfa;
}

function match(string, pattern) {
  let strLen = string.length;
  let patLen = pattern.length;
  let strIndex = 0;
  let patIndex = 0;
  let o = {};
  const dfa = KMP(pattern);

  for (let char of pattern) {
    if (!o[char]) {
      o[char] = char;
    }
  }

  for(; strIndex < strLen && patIndex < patLen; strIndex++) {
    patIndex = !!o[string[strIndex]] ? dfa[patIndex][string[strIndex]] : 0;
  }

  if (patIndex === patLen)
    return "success and match at index of " + (strIndex - patL);
  else {
    return false;
  }
}

console.log(KMP("ababac"));
console.log(match('asdfasdfsafabababafabababacasdf', 'ababac'));
//asdfasdfsafabababafabababacasdf
//BABACDABABAC
