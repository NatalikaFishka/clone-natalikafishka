const path = require('path');

module.exports = {
    entry: './src/canvas.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
