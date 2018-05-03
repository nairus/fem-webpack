/* eslint no-console:"off" */
const { resolve } = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackValidator = require('webpack-validator')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

module.exports = env => {
    const { ifProd, ifNotProd } = getIfUtils(env)
    const config = webpackValidator({
        context: resolve('src'),
        entry: {
            'app': './bootstrap.js',
            'vendor': ['todomvc-app-css/index.css']
        },
        output: {
            filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
            path: resolve('dist'),
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        module: {
            loaders: [
                {
                    test: /\.js$/, loaders: ['babel-loader'] /* BREAKING CHANGE: It's no longer allowed to omit the '-loader' suffix when using loaders. */,
                    exclude: /node_modules/
                },
                { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            ],
        },
        plugins: removeEmpty([
            new ProgressBarPlugin(),
            ifProd(new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
            })),
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: 'head'
            }),
        ]),
    })
    if (env.debug) {
        console.log(config)
        debugger // eslint-disable-line
    }
    return config
}