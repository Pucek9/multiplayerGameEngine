const webpack = require('webpack');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');

const environment = process.env.NODE_ENV || 'development';
const url = process.env.URL || ip.address() || 'localhost';
const port = process.env.PORT || '80';
const isProd = environment === 'production';

console.log(`${url}:${port}`);
const config = [
  {
    name: 'client',
    context: __dirname + '/src/client/',

    entry: {
      robocop: './main.ts',
    },

    output: {
      path: __dirname + '/dist/client',
      // publicPath: "/assets/",
      filename: '[name].bundle.js',
    },

    devtool: 'source-map',

    mode: environment,

    devServer: {
      port: 8080,
      host: url,
      stats: 'errors-only',
      open: true,
      public: `${url}:${port}`,
      hot: true,
      contentBase: ['./dist/client'],
      watchContentBase: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Custom template',
        template: 'index.html',
        hash: isProd,
      }),
      new TsConfigPathsPlugin({ configFileName: 'tsconfig.json' }),
      new webpack.DefinePlugin({
        'process.env': {
          URL: JSON.stringify(url),
          NODE_ENV: JSON.stringify(environment),
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif|fbx)$/,
          use: ['file-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'postcss-loader',
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  },
  {
    name: 'server',
    context: __dirname + '/src/server/',

    entry: {
      robocop: './main.ts',
    },

    output: {
      path: __dirname + '/dist/server',
      filename: '[name].bundle.js',
      libraryTarget: 'commonjs',
    },

    mode: environment,

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    target: 'node',
    externals: [/^(?!\.|\/).+/i],

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: 'cheap-module-source-map',

    plugins: [new TsConfigPathsPlugin({ configFileName: 'tsconfig.json' }), new CheckerPlugin()],
  },
];

module.exports = config;
