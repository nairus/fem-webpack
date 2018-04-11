process.env.BABEL_ENV = 'test'
const webpackEnv = { test: true }
const webpackConfig = require('./webpack.config.babel')(webpackEnv)
const fileGlob = 'src/**/*.test.js'
const preprocessors = {
    [fileGlob]: ['webpack']
}
module.exports = config => {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [fileGlob],
        preprocessors,
        webpack: webpackConfig,
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: 'coverage/', subdir: '.' },
                { type: 'json', dir: 'coverage/', subdir: '.' },
                { type: 'text-summary' },
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity,
    })
}
