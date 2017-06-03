var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

function isNodeModule(module) {
    return module.context && module.context.indexOf("node_modules") !== -1;
}

module.exports = {
    entry:  {
        app: path.resolve('./app') + '/app.jsx'
    },
    output: {
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    plugins: ([
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: isNodeModule
        }),
        new webpack.DefinePlugin({
            PRODUCTION: ENV == 'production'
        }),
        new CopyWebpackPlugin([
            {from: 'index.html'},
            {from: '.htaccess'}
        ])
    ]).concat(ENV==='production' ? [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                unsafe_comps: true,
                properties: true,
                keep_fargs: false,
                pure_getters: true,
                collapse_vars: true,
                unsafe: true,
                warnings: false,
                screw_ie8: true,
                sequences: true,
                dead_code: true,
                drop_debugger: true,
                comparisons: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                if_return: true,
                join_vars: true,
                cascade: true,
                drop_console: true
            }
        })
    ] : []),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        open: true
    }
};