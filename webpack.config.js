var path = require('path');
let webpack = require("webpack");

module.exports = {
    entry: {
        app: './src/App.js',
        vendor: ["react","react-dom"]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader?cacheDirectory=true',
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),

        })
    ],
};

