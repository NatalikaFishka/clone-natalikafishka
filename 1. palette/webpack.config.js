const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/canvas.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlPlugin({
            filename: 'main.html',
            template: './src/index.html'
        })
    ]
};
