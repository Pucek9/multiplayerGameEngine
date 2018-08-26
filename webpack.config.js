const webpack = require('webpack');
const path = require('path');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const url = process.env.IP || '127.0.0.1';
const port = process.env.PORT  || '3000';
const config = [{

    context: __dirname + '/src/client/',

    entry: {
        robocop: './games/robocop/main.ts',
    },

    output: {
        path: __dirname + '/dist/client',
        // publicPath: "/assets/",
        filename: '[name].bundle.js',
    },
    devtool: "source-map",

    mode: process.env.NODE_ENV || 'development',

    devServer: {
        port: 8080,
        host: url,
        stats: 'errors-only',
        open: true,
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
        new TsConfigPathsPlugin({ configFileName: "tsconfig.json" }),
        new webpack.DefinePlugin({
            'process.env': {
                'IP': JSON.stringify(url),
                'PORT': JSON.stringify(port),
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }

}, {

    context: __dirname + '/src/server/',

    entry: {
        robocop: './main.ts',
    },

    output: {
        path: __dirname + '/dist/server',
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs',
    },

    mode: process.env.NODE_ENV || 'development',

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    externals: [/^(?!\.|\/).+/i,],

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    devtool: 'cheap-module-source-map',

    plugins: [
        new TsConfigPathsPlugin({ configFileName: "tsconfig.json" }),
        new CheckerPlugin(),
        // new NodemonPlugin({watch: path.resolve('./dist/server/'),})
    ],

}];

module.exports = config;