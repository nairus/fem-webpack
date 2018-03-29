const webpackValidator = require('webpack-validator')
const { resolve } = require('path')

module.exports = env => {
    return webpackValidator({
        context: resolve('src'),
        entry: './bootstrap.js',
        output: {
            path: resolve('dist'),
            filename: 'bundle.js',
            publicPath: "/dist/",
        },
        devtool: env.prod ? 'source-map' : 'eval'
    })
}