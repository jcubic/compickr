var webpack = require('webpack');
var path = require('path');
var copyWebpackPlugin = require('copy-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

function isNodeModule(module) {
    return module.context && module.context.indexOf("node_modules") !== -1;
}

module.exports = {
    entry:  {
        app: path.resolve('./app') + '/index.jsx'
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
            PRODUCTION: ENV === 'production'
        }),
        new copyWebpackPlugin([
            {from: 'index.html'},
            {from: '.htaccess'},
            {from: 'config.json'},
            {from: 'api', to: 'api'},
            {from: 'favicon', to: 'favicon'}
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
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        open: true
    }
};
