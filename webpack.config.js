const webpack = require('webpack');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

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
    mode: 'development',

    devServer: {
        port: 8080,
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
        new TsConfigPathsPlugin({ configFileName: "tsconfig.json" })
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

    mode: 'development',

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

    plugins: [
        new TsConfigPathsPlugin({ configFileName: "tsconfig.json" }),
        new CheckerPlugin()
    ],

}];

module.exports = config;