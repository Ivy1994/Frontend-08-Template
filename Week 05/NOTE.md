学习笔记

## range
## CSSOM

## Proxy 与双向绑定
Proxy 是一个全新的全局构造函数(类似 Date 或者 Number).可以传递给其一个对象以及一些 hook,她会返回一个新的对象，新的对象使用这些 hook 包裹老对象。
1. 创建代理
Proxy 构造函数接受两个参数，第一个位你想要代理的初始对象，第二个为一系列处理钩子。
？？？ 任何你和原始对象的交互，都会影响到代理。同理，任何你对代理做的改变，反过来也都会影响到原始对象(怎么感觉布不太对呢？)
```
let myObject = {};

let po = new Proxy{myObject, {hooks}}
```
2. 代理的处理钩子
apply():
construct:
defineProperty
getOwnPropertyDescriptor
deleteProperty
getPropotypeOF:获得某实例原型
setPropotypeOF:
inExtensible
preventExtensions
get
set
has
ownKeys
3. 例子
构建一个可无线链接的 API


预备知识：
### 1. 元编程
是指关于一门语言的底层机制，“让程序来制作程序”
元编程包括代码生成（eval）、反射（Reflection）等。
其中反射允许改变应用程序的内部工作机制。
ES6 带来了三个全新的 API：Symbol Reflect and Proxy.
1.1 Symbol: Reflection within implementation, 将 symbol 应用到你已有的类和对象上去改变他们的行为
1.2 Reflect：Reflection through introspection 通过自省实现反射，通常用来探索非常底层的代码信息
1.3 Proxy: Reflection through intercession 通过调节实现反射，包裹对象并通过自陷（trap）来拦截对象行为
### 2. Symbol
Symbol 是新的原始类型，就像 Number ,String  一样。
1. 使用 Symbol() 函数来创建 Symbol.
```
Symbol();//Symbol()
Symbol('foo');//Symbol(foo)
typeof Symbol() === 'symbol';//true
```
2. Symbols 拥有内置的 Debug 能力
```
assert(Symbol('foo').toString() === 'Symbol(foo)');
```
3. Symbols 能被用作对象的 key
这意味可以分配无限多的具有唯一性的 Symbols 到一个对象上。这些 key 保证不会和现有的字符串 key 冲突，或者和其他 Symbol key 冲突。
Symbol key 无法通过 for in,for of 或者 Object.getOwnPropertyNames 获取。获得它们的唯一方式是 Object.getOwnPropertySymbols。
```
var fooSym = Symbol('foo');
var myObj = {};
myObj['foo'] = 'bar';
myObj[fooSym] = 'baz';
Object.keys(myObj); // -> [ 'foo' ]
Object.getOwnPropertyNames(myObj); // -> [ 'foo' ]
Object.getOwnPropertySymbols(myObj); // -> [ Symbol(foo) ]
assert(Object.getOwnPropertySymbols(myObj)[0] === fooSym);

```
4. Symbols 是完全唯一的
默认情况下，每一个新创建的 Symbol 都有一个完全唯一的值。如果新建一个 symbol ,在 JS 引擎内部，就会创建一个全新的值。如果你不保留对 Symbol 对象的引用，你就无法使用他。这意味着两个 Symbol 将绝不会等同于同一个值，即使他们有一样的描述。
```
assert.notEqual(Symbol(), Symbol());
assert.notEqual(Symbol('foo'), Symbol('foo'));
assert.notEqual(Symbol('foo'), Symbol('bar'));

var foo1 = Symbol('foo');
var foo2 = Symbol('foo');
var object = {
    [foo1]: 1,
    [foo2]: 2,
};
assert(object[foo1] === 1);
assert(object[foo2] === 2);
```
Symbol.for() and Symbol.keyFor() 可以使用Symbol.for()实现symbol 的获得和重用

```
var myObj = {};
var fooSym = Symbol.for('foo');
var otherSym = Symbol.for('foo');
myObj[fooSym] = 'baz';
myObj[otherSym] = 'bing';
console.log(fooSym === otherSym);
console.log(myObj[fooSym] === "bing");
console.log(myObj[otherSym] === "bing");
/*************************************/
var localFooSymbol = Symbol('foo');
var globalFooSymbol = Symbol.for('foo');
Symbol.keyFor(localFooSymbol) === undefined;
Symbol.keyFor(globalFooSymbol) === 'foo'
```
5. Symbols 适合以及不适合的场景
5.1 Symbols 绝不会与对象的字符串 Key 冲突：这一特性让 Symbol 在扩展已有对象时表现卓著（例如，Symbol 作为了一个函数参数），它不会显式地影响到对象
5.2 Symbols 无法通过现有的反射工具读取：需要用 Object.getOwbPropertySymbols() 来访问对象上的 symbols。适合储存那些你不想让别人直接获得的消息
5.3 Symbols 不是私有的
5.4 可枚举的 Symbols 能够被复制到其他对象：可以使用 Object.assign 这样的方式完成。Object.assign(newObject, objectWithSymbols) 所有的可迭代的 Symbols 作为了第二个参数传入，这些 Symbols 会被复制到第一个参数上。如果不想，可以使用Object.defineProperty 让这些 Symbols 变得不可迭代。
5.5 Symbols 不能强制类型转换为原始对象
场景1： 作为一个可替换字符串或者整型使用的唯一值
场景2： 作为一个对象中放置元信息（metadata）的场所
场景3： 给予开发者在 API 中为对象添加钩子（hook）的能力？？？？？？？
6. 内置的 Symbols(其实不太看得懂。。。)
https://juejin.cn/post/6844903511960846350#heading-12

###2 Reflect
Reflect 是一个新的全局变量，类似 JSON 和 Math.该对象提供了大量有用的内省（“看看那个东西” 的一个非常华丽的表述）方法。
2.1 Reflect 方法
Reflect.apply(target, thisArgument[, argumentList])
Reflect.construct(target, argumentList[, constructorToCreateThis])
```
class Greeting {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return "Hello" + this.name;
  }
}

const greetingFactory = (name) => Reflect.construct(Greeting, [name]);
```
Reflect.defineProperty(target, propertyKey, attributes)
Reflect.deleteProperty(target, propertyKey)
Reflect.getPropotypeOF(target)
Reflect.setPropotypeOF(target, proto)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.enumerate ( target )
Reflect.get(target, propertyKey[, receiver])
```
var myObject = {
  foo:1,
  bar:2,
  get baz() {
    return this.foo + this.bar;
  }
}
var myReceiverObject = {
  foo:4,
  bar:4
};

console.log(Reflect.get(myObject,'baz',myReceiverObject));
```
Reflect.set(target, propeKey,Value[,receiver])
Reflect.has(target, propertyKey)
Reflect.ownKeys(target)


###3 代理模式
