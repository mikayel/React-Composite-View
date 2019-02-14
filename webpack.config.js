var webpack = require('webpack');
var path = require('path');

const config = {
    entry: {
        App: ['./App.js']
    },

    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].chunk.js',
        publicPath: '/dist/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/env", "@babel/react"],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/transform-async-to-generator',
                            '@babel/transform-regenerator',
                            '@babel/transform-runtime'
                        ]
                    }

                }]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {   test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },

    resolve: {
        extensions: [".js", ".jsx", ".css", ".json"],
        modules: [
            path.resolve('./'),
            'node_modules'
        ]
    },

    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname
            }
        })
    );
}

module.exports = config;