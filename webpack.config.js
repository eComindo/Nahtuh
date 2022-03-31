const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

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
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
              params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
              },
            },
            threshold: 10240,
            minRatio: 0.8,
        }),
    ]
};