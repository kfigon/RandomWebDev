const path = require('path');

module.exports = {
    entry: path.join(__dirname, './scripts/app.ts'),
    devtool: 'inline-source-map',
    output: {
        filename: './dist/app.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};