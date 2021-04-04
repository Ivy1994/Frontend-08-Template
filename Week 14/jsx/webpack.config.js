module.exports = {
    entry: "./main.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader:"babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [ ["@babel/plugin-transform-react-jsx", {pragma: "createElement"}]]
                    }
                }
            }
        ]
    },
    mode: "development"// production， 开发者模式下不会压缩代码方便调试
}