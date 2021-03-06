const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
        vender: [ 
            'react', 'react-dom', 'redux', 
            'react-redux', 'react-router-dom', 
            'axios', 'prop-types' ]
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, 'sass-loader'],
                    }
                )
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    }],
            },{ test: /\.css$/, loader: 'style-loader!css-loader'}
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.html')}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: "manifest.js",
            chunks: ['vender']
        }),
        new ExtractTextPlugin({
            filename: 'styles/style.css'
        }),
    ]
}