// function match(string) {
//   let state = start;
//   for (let char of string) {
//     state = state(char);
//   }
//   return state === end;
// }
//
// function start(char) {
//   if (char === "a")
//     return foundA;
//   else
//     return start(char);
// }
//
// function end(char) {
//   return end;
// }
//
// function foundA(char) {
//   if (char === "b")
//     return foundB;
//   else
//     return start(char);
//     //return start(char);
// }
//
// function foundB(char) {
//   if (char === "c")
//     return foundC;
//   else
//     return start(char);
// }
//
// function foundC(char) {
//   if (char === "d")
//     return foundD;
//   else
//     return start(char);
// }
//
// function foundD(char) {
//   if (char === "e")
//     return foundE;
//   else
//     return start(char);
// }
//
// function foundE(char) {
//   if (char === "f")
//     return end;
//   else
//     return start(char)s;
// }
//
// console.log(match("ababcdef"));

//使用状态机处理“abcabx”字符串

/*
function stateMatch(string) {
  let state = start;
  for (let char of string) {
    state = state(char);
  }
  return state === end;
}
function start(char) {
  if (char === "a")
    return foundA;
  else
    return start;
}
function end(char) {
   return end;
 }
function foundA(char) {
  if (char === "b")
    return foundB;
  else
    return start(char);
}
function foundB(char) {
  if (char === "c")
    return foundA;
  else if (char === "x")
    return end;
  else
    return start(char);
}

console.log(stateMatch("ababcaebxfd"));
console.log(stateMatch("abcabcabx"));
*/

//1. 使用状态机处理“abababx”字符串
//2. 如何用状态机处理完全未知的pattren
//参考资料：字符串 KMP 算法
//

function match3(string) {
  let state = start;
  for (let char of string) {
    state = state(char);
  }
  return state === end;
}

function start(char) {
  if (char === "a")
    return foundA;
  else
    return start;
}

function end(char) {
  return end;
}
function foundA(char) {
  if (char === "b")
    return foundB;
  else
    return start(char);
}
// function foundB(char) {
//    if (char === "a")
//      return foundA;
//    else
//      return start(char);
//  }
// function foundX(char) {
//   if (char === "x")
//     return end;
//   else
//     return foundB(char);
//  }
function foundB(char) {
  if (char === "x")
    return end;
  else
    return start(char);
}

console.log(match3("abcababababx"));
