#CSS 排版
1. 盒: 
Tag Element Box

2. 盒模型

box-sizing:
content-box:with = content width
border-box: with = content width + padding + border

# 正常流
1. 正常流 能力最差
2. flex 最简单的
3. grid

layout 排版 盒和文字
BFC and IFC 

# 正常流的行级排布
line-top
text-top
baseline
text-bottom
line-bottom

正常流中的盒的先后顺序和盒子的尺寸，都会影响 line-top 和line-bottom 但是不会影响 text-top He text-bootom
* 行内盒 inline-block 他的基线随着里面的文字来变化的，所以不建议行内盒使用基线对齐

# 正常流的块级排布
1. float 与 clear
