const { resolve } = require('path')

module.exports = () => {
    return {
        context: resolve('src'),
        entry: './bootstrap.js',
        output: {
            filename: 'bundle.js'
        }
    }
}