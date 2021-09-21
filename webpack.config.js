const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    target: 'web',
    entry: './src/index.js',
    output: {
        filename: 'nahtuhclient.js',
        path: path.resolve(__dirname, './dist'),
        library: 'NahtuhClient',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/](?!(lit-element|lit-html)[\\/]).*/,
                use: 'babel-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "src/components/assets", to: "assets" }
            ],
        }),
    ]
};
