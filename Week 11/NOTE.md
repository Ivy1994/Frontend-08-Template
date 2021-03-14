#  CSS @ 规则
1. @charset： 不用
2. @import： 大多数不会用
3. @media：**
4. @page: 分页媒体
5. @counter-style: 定制列表形状时
6. @keyframs: **
7. @fontface: **
8. @support: 老师不推荐用目前， 4 - 5 年之后
9. @namespace:极端

# css rule

一 Selector
根元素： select group (, 号分隔)
selector: >（直接子代选择器） 空格（后代选择器） +(兄弟选择器 后面) ~（通用兄弟选择器 后面）
simple selector：type * . #  [] : ::(伪元素) :not()
二 Key:
properties
variables:--i
### CSS 变量
1. 声明变量： --
```css
body {
    --foo: #889dsc;
    --bar: #F7EFD2;
}
```
2. 使用 var() 函数读取变量
```css
a {
    color: var(--foo);
    background-color(--bar, #fff);
}
```
3. 作用域一起其他特性与 CSS 一样
4. 变量值的类型
如果是字符串可以与其他字符串直接拼接
```css
a {
    -boo: 'hello';
    --foo: var(--bar)'world';
}
```
如果是数值的话，不能与数值单位直接连用，要使用 calc() 函数
```css
.foo {
    --gap: 20;
    margin-top: calc(var(--gap)*1px);
}
.foo {
    --gap:20px;
    margin-top: var(--gap);
}
```
三 Value:
1. rem（根节点） em(父节点) px vh（视窗高度的 1%） vw （1vw 等于视窗宽度的 1%。）

clac()
attr()
number 

#选择器优先级
内联 > ID 选择器 > 类 属性 伪类 选择器 > 便签 伪元素选择器


?为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
我认为是因为 first-line 选中的是浏览器中显示第一行文字。不同宽度第一行文字是不同的，要对其重新布局排版消耗性能大。
