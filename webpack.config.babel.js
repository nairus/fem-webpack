/* eslint no-console:"off" */
const { resolve } = require('path')
const webpackValidator = require('webpack-validator')
const { getIfUtils } = require('webpack-config-utils')

module.exports = env => {
    const { ifProd, ifNotProd } = getIfUtils(env)
    const config = webpackValidator({
        context: resolve('src'),
        entry: './bootstrap.js',
        output: {
            filename: 'bundle.js',
            path: resolve('dist'),
            publicPath: '/dist/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
    })
    if (env.debug) {
        console.log(config)
        debugger // eslint-disable-line
    }
    return config
}