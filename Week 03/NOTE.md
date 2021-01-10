学习笔记
# 正则表达式
## 1 JS 中关于正则的方法
1.1 RegExp.exec(string):在一个指定字符串中执行一个搜索匹配。返回一个数组或者 null
### 结果：
result[0]: 匹配的全部字符串
result[1] - [n]: 括号中的分组捕获
index: 匹配到的字符位于原始字符串基于 0 的索引
input: 原始字符串
### Reg：
lastIndex:下一次匹配开始的位置
ignoreCase: 是否使用了 "i" 标记使正则匹配忽略大小写
global: 是否使用了 "g" 标记来进行全局的匹配.
multiline: 是否使用了 "m" 标记使正则工作在多行模式
source: 正则匹配的字符串

1.2 String.match(regexp);
1.3 RegExp.test();
1.4 String.search();

# genertor 函数 and yield
