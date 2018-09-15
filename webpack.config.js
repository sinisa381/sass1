const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'main':['babel-polyfill','./project/js/index.js','./project/sass/index.scss' ],
        // 'packages':['babel-polyfill','./project/js/packages.js','./project/packages/packages.scss'],
        // 'shared':['./project/js/shared.js']       // ne moze babel-polyfil ovde
    },
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js',
        // publicPath: 'build/',                     //kvari dev server
    },
    devServer: {
        contentBase: ('./build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
                    
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ 
                    {loader: 'style-loader'},
                    MiniCssExtractPlugin.loader,
                    //  {loader: 'css-loader', options:{sourceMap:true, importLoaders:1}}, 
                     {loader: 'css-loader'},
                     {loader:'postcss-loader'},
                     {loader: 'sass-loader'}
                    //  {loader:'sass-loader', options:{sourceMap:true}}
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    // {loader:'url-loader', options:{limit:10000, name: 'img/[name].[ext]'}},
                    {
                        loader: 'url-loader'
                    },

                    {
                        loader: 'img-loader'
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // hash: true,
            template: './project/index.html',
            chunks: ['main'],
            // filename: 'index.html',
            // style: '[name].style'
            // chunksSortMode: 'auto'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            // chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin('build/*./*', {}),
    ]
}