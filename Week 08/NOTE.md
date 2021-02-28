学习笔记

# JavaScript 里面的循环方法： forEach for-in for-of
1. forEach

```js
myArray.forEach(function(value, index){
  console.log(value);
  })
```

缺点：不能中断循环（使用 break 语句和 return 语句）

2. for-in

for in 循环实际是为循环 enumerable 对象而设计的，循环的是 key 值

```js
var obj = {
  a: 1,
  b: 2,
  c: 3
};
for (var prop in obj) {
  console.log("obj." + prop + "=" + obj[prop]);
}
```

不建议 使用 for in 循环数组

3. for-of

for of 循环的是  value 值

```js
for (let value of Obj) {
  console.log(value);
}
```
for of 循环使用的例子

3.1 循环一个数组

```js
const iterable = [
  10, 20, 30
]
for (let value of iterable) {
  console.log(value);
}
//10
//20
//30
```
3.2 循环一个字符串

```js
const iterable = "boo";
for (let value of iterable) {
  console.log(value);
}
//b
//o
//o
```
3.3 循环一个Map

```js
const iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let [key, value] of iterable) {
  console.log(value);
}
//1
//2
//3

for (let entry of iterable) {
  console.log(entry);
}
//["a", 1]
//["b", 2]
//["c", 3]
```
3.4 循环一个 Set

```js
let iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

3.5 循环一个 DOM collection
```js
let articleParagraphs = document.querySelectorAll("article > p");

for (let paragraph of articleParagraphs) {
  paragraph.classList.add("read");
}
```

# 浏览器工作原理

URL ————HTTP————> HTML ————parse————> DOM ————css computing————> DOM with CSS ————layout————> DOM  with position ————render————>Bitmap

URL (HTTP) /HTML/ (parse) /DOM/ (css computi )  /DOM with css/ (layout) /DOM with position/ (render) /Bitmap/

# 有限状态机
有限状态机处理字符串
1. 每个状态都是一个机器
在每一个机器里，我们可以做计算 存储 输出
所有的这些机器接受的输入是一致的
状态机的每一个机器本身都是无状态的，如果以我们用函数表示应该是纯函数
2. 每一个机器知道下一个状态
Mealy
Moore
3. 状态机在 JS 中的实现
```js
function state(input) {
  return next;
}

while (input) {
  state =  state(input);
}
```

#

```js
function findA(string) {
  for (let char of string) {
    if (char === "a")
    return true;
  }
}

console.log(findA("heiuwheuwhahh"));

function findAB(string) {
  let foundA = false;
  for (let char of string) {
    if (char === "a")
      foundA = true;
    else if(foundA &&char == "b")
      return true;
    else
      foundA =  false;
  }
  return false;
}
//abcdef
function match(string) {
  let status = false;
  let match =  false;
  for (let char of string) {
    if (char === "a")
      status = true;
    else if (status && char === "b")
      status = true;
    else if (status && char === "c")
      status = true;
    else if (status && char === "d")
      status = true;
    else if (status && char === "e")
      status = true;
    else if (status && char === "f")
      return true;
    else
      status = false;
  }
  return false;
}

```

4. KMP 算法
第一步： 对模式串求解其部分匹配表
TODO： 整理 PTM 和 DFM  两种不同的算法以及实现的代码，并看完 coursera 上面的课程
5. 动态规划

# 浏览器的工作原理
1. HTTP 协议的解析
IOS—OSI 七层网络模型
