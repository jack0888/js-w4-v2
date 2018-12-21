/**
 * Created by Developer on 2018/8/22 0022.
 */

const path  = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'bundle.js',
    },
    resolve:{
        extensions:[".js",".json",".jsx",".css",'.vue']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader'
                }
            },
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.css$/,use:['vue-style-loader','style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader']},
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|svgz)$/,
                use:{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]?[hash]'
                    }
                }
            },
        ]

    },
    plugins:[
        new HtmlWebpackPlugin({template:'./public/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    devServer:{
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        port:9000,
        hot:true,
        inline:true,
        open:true
    }
}

module.exports = config;