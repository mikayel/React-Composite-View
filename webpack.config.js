var webpack = require('webpack');
var path = require('path');
process.noDeprecation = true

const config = {
    entry: {
        app: ['./App.js']
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/'
    },

    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: [{
                loader: 'babel-loader',
                options: {
                  presets: [['es2015', {modules: false}], "react"],
                  plugins: [
                            'syntax-dynamic-import',
                            'transform-async-to-generator',
                            'transform-regenerator',
                            'transform-runtime'
                          ]
                }
              }]
            },
            {   test: /\.css$/,
                loaders: [ 'style-loader',
                    { loader: 'css-loader',
                        query: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                loader: 'url?limit=8192'
            }

        ]
    },

    resolve: {
        extensions: [".js", ".jsx", ".css"],
        modules: [
          path.resolve('./'),
          'node_modules'
        ]
    },

    plugins: [
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        },
        output: {
            comments: false
        },
      })
    );
}

module.exports = config;
