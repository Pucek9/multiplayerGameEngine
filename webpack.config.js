const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const config = [{

    context: __dirname + '/src/client/', // `__dirname` is root of project and `src` is source

    entry: {
        robocop: './games/robocop/main.js',
    },

    output: {
        path: __dirname + '/dist/client', // `dist` is the destination
        // publicPath: "/assets/",
        filename: '[name].bundle.js',
    },

    mode: 'development',

    devServer: {
        port: 8080,
        stats: 'errors-only',
        // open: true,
        hot: true,
        contentBase: ['./dist/client'],
        watchContentBase: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'index.html',
            hash: isProd
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

}, {

    context: __dirname + '/src/server/', // `__dirname` is root of project and `src` is source

    entry: {
        robocop: './main.js',
    },

    output: {
        path: __dirname + '/dist/server', // `dist` is the destination
        // publicPath: "/assets/",
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs',
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    target: 'node',
    externals: [/^(?!\.|\/).+/i,],


}];

module.exports = config;