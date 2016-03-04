'use strict';

module.exports = function karmaConfig (config) {
    config.set({
        frameworks: [ 'jasmine' ],
        reporters: [ 'progress', 'coverage' ],
        files: [ 'src/tests.webpack.js' ],
        preprocessors: { 'src/tests.webpack.js': ['webpack', 'sourcemap'] },
        browsers: [ 'PhantomJS2' ],
        singleRun: true,
        coverageReporter: {
            dir: 'build/coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'html'}
            ]
        },
        webpack: require('./webpack.config')('test'),
        webpackMiddleware: { noInfo: true }
    });
};