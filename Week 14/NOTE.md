1. 对象与组件
End User Input ——> state ——> children                                

attribute & property
property: 强调从属关系

```html
<my-component attribute= 'v' />

<!--attribute：-->
myComponent.getAttribute("a");
myComponent.setAttribute("a",value);
<!--property:-->
myComponent.a = "value"

```
不一样哦
2. lifecycle 生命周期
ceated ——> mount: 是否被创建并挂载到树上 ——> mount ——> unmount ——> destroied
       ——> JS  change/set ——> render/update  ——> destroied
       ——> use Input ——> render/update  ——> destroied

还有其他细节 但是这个是最本质最贴近人类思维的抽象的东西

3. children
content 类型 & template 型

************************************************************
1. 为组件添加 JSX 语法
// webpack 就是把不用的 JS文件和 import 的文件打包到一起，  babel 可以版新版的 JS 编译成一个老版本的JS,这样子就可以在老版本的浏览器中跑了  , JSX 是babel 的一个插件
## 搭建一个简单的 JSX 环境
1.1 创建一个新的目录 mkdir jsx
1.2 npm init
1.3 安装 webpack（全局）：npm install -g webpack webpack-cli (我安装全局后发现 package.json 没有变化所以用安装到了本地还是不行的话需要配置一下环境变量)
webpack --version 
1.4 安装 babel-loader and plugin，安装到本地目录
npm install --save-dev webpack babel-loader
1.5 进入到我们项目与的目录，新建 webpack.config.js 以及一个 entry (main.js) 在main.js 中编写我的 JS 代码。
然后在终端跑一下 webpack 会生成一个 dist 目录

webpack.config.js 内容
```javascript
    module.exports = {
        entry: "./main.js"
    }
```
1.6  安装 babel , npm install --save-dev @babel/core @babel/preset-env
1.7 继续配置webpack.config.js
webpack.config.js 内容
```javascript
    module.exports = {
        entry: "./main.js"，
        module: {
                {
                    test: /\.js$/,
                    use: {
                        loader： "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        mode: "development"// production， 开发者模式下不会压缩代码方便调试
    }
``` 
使用 webpack 跑一下babel
1.8 npm install --save-dev @babel/plugin-transform-react-jsx
1.9 继续配置 webpack.config.js,之后再次编译
webpack.config.js 内容
```javascript
    module.exports = {
        entry: "./main.js"，
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader： "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ["@babel/plugin-transform-react-jsx"]
                        }
                    }
                }
            ]
        },
        mode: "development"// production， 开发者模式下不会压缩代码方便调试
    }
``` 


********************************************************************************

1. JSX 的基本使用方法
1.1 修改 webpack.config.js ，so that 和 react 没有联系
user.options 修改属性 plugins: [ ["@babel/plugin-tansform-react-jsx", {pragma: "createElement"}]]
1.2 创建一个文件并运行

*********************************************************

1. 实现 Carousel 轮播组件
1.1 安装 webpack-dev-server (避免每次都要重新敲 webpack 进行编译打包) npm install --save-dev  webpack-dev-server
|| npm install --save-dev webpack-cli
安装后使用 webpack-dev-server
