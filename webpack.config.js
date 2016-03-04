'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function makeWebpackConfig (ENV) {

    var config = {

        // entry point
        entry: ENV === 'test' ? {} : {
            app: './src/app/app.js'
        },

        // output directory
        output: ENV === 'test' ? {} : {

            // Absolute output directory
            path: __dirname + '/dist',

            // Uses webpack-dev-server in development
            publicPath: ENV === 'prod' ? '/' : 'http://localhost:8080/',

            // Filename for entry points, Only adds hash in build mode
            filename: ENV === 'prod' ? '[name].[hash].js' : '[name].bundle.js',

            // Filename for non-entry points
            chunkFilename: ENV === 'prod' ? '[name].[hash].js' : '[name].bundle.js'
        },

        // Add vendor prefixes to css
        postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],

        // This handles most of the magic responsible for converting modules
        module: {
            preLoaders: [],
            loaders: [
                // Compiles ES6 and ES7 into ES5 code
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },

                // Postprocess css with PostCSS plugins, Extract css files in production builds
                { test: /\.css$/, loader: ENV === 'test' ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss') },

                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                { test: /\.(json|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, loader: 'file' },

                // Allow loading html through js
                { test: /\.html$/, loader: 'raw' }
            ]
        },

        // plugins
        plugins: [],

        // Type of sourcemap to use per build type
        devtool: ENV === 'test' ? 'inline-source-map' : ENV === 'prod' ? 'source-map' : 'eval-source-map',

        // webpack dev server - serves src/public folder
        devServer: {
            contentBase: './src/public',
            stats: {
                modules: false,
                cached: false,
                colors: true,
                chunk: false
            }
        }
    };

    // Instrument JS files with Isparta for subsequent code coverage reporting
    if (ENV === 'test') {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [ /node_modules/, /\.spec\.js$/ ],
            loader: 'isparta-instrumenter'
        })
    }

    // Skip rendering index.html in test mode
    if (ENV !== 'test') {
        config.plugins.push(
            new HtmlWebpackPlugin({ template: './src/public/index.html', inject: 'body' }), // Render index.html
            new ExtractTextPlugin('[name].[hash].css', {disable: ENV !== 'prod'}) // Extract css files
        )
    }

    // Add build specific plugins
    if (ENV === 'prod') {
        config.plugins.push(
            new webpack.NoErrorsPlugin(), // Only emit files when there are no errors
            new webpack.optimize.DedupePlugin(), // Dedupe modules in the output
            new webpack.optimize.UglifyJsPlugin(), // Minify all javascript, switch loaders to minimizing mode
            new CopyWebpackPlugin([{ from: __dirname + '/src/public' }]) // Copy assets from the public folder
        )
    }

    return config;
};
